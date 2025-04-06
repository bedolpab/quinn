import csv
import ast
import datetime
from datetime import datetime as dt
from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent.parent
PREREQS_PATH = BASE_DIR / 'data' / 'prereqs.csv'

def parse_time(time_str):
    try:
        return dt.strptime(time_str, '%I:%M %p').time()
    except (ValueError, TypeError):
        return None

def times_overlap(start1, end1, start2, end2):
    s1 = start1.hour * 60 + start1.minute
    e1 = end1.hour * 60 + end1.minute
    s2 = start2.hour * 60 + start2.minute
    e2 = end2.hour * 60 + end2.minute
    return max(s1, s2) < min(e1, e2)

class PendingCourseManager:
    def __init__(self, student_record):
        self.student_record = student_record
        self.pending_courses = {}
        self.cleared_courses = {}
        self.prereq_map = self.load_prerequisites()

    def load_prerequisites(self):
        prereq_map = {}
        try:
            df = pd.read_csv(PREREQS_PATH)
            for _, row in df.iterrows():
                course = row['Course'].strip()
                prereqs_raw = row['Prerequisites']
                prereqs = ast.literal_eval(prereqs_raw) if isinstance(prereqs_raw, str) else []
                prereq_map[course] = prereqs
        except Exception as e:
            print(f"Error loading prerequisites: {e}")
        return prereq_map

    def add_course(self, course):
        key = f"course_{course['registration_number']}"
        course["status"] = "pending"
        course["flag_reason"] = None
        self.pending_courses[key] = course

    def remove_course(self, registration_number):
        key = f"course_{registration_number}"
        if key in self.pending_courses:
            del self.pending_courses[key]

    def check_already_taken(self, course):
        if course["registration_number"] in self.student_record.get("courses_taken", []):
            return False, "Already taken"
        return True, None

    def check_offering(self, course):
        if course.get("credit_hours", 0) <= 0:
            return False, "Course not offered"
        return True, None

    def check_prerequisites(self, course):
        code = course.get("subject", "") + " " + str(course.get("number", ""))
        required_prereqs = self.prereq_map.get(code, [])
        taken = self.student_record.get("courses_taken", [])
        for prereq in required_prereqs:
            if prereq not in taken:
                return False, "Prerequisites not met"
        return True, None

    def check_schedule_conflict(self, course):
        course_start = parse_time(course.get("start_time"))
        course_end = parse_time(course.get("end_time"))
        if not course_start or not course_end:
            return True, None

        for cleared in self.cleared_courses.values():
            cleared_start = parse_time(cleared.get("start_time"))
            cleared_end = parse_time(cleared.get("end_time"))
            if not cleared_start or not cleared_end:
                continue
            if set(course.get("days_of_week", [])) & set(cleared.get("days_of_week", [])):
                if times_overlap(course_start, course_end, cleared_start, cleared_end):
                    return False, "Schedule conflict"
        return True, None

    def validate_courses(self):
        self.cleared_courses = {}
        for key, course in self.pending_courses.items():
            valid, reason = self.check_already_taken(course)
            if not valid:
                course["status"] = "flagged"
                course["flag_reason"] = reason
                continue
            valid, reason = self.check_offering(course)
            if not valid:
                course["status"] = "flagged"
                course["flag_reason"] = reason
                continue
            valid, reason = self.check_prerequisites(course)
            if not valid:
                course["status"] = "flagged"
                course["flag_reason"] = reason
                continue
            valid, reason = self.check_schedule_conflict(course)
            if not valid:
                course["status"] = "flagged"
                course["flag_reason"] = reason
                continue

            course["status"] = "cleared"
            course["flag_reason"] = None
            self.cleared_courses[key] = course
        return self.pending_courses, self.cleared_courses
