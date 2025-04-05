import os
import re
import numpy as np
import pandas as pd

def clean_credit_hours(credit_hours: str):
    credit_hours = re.sub(r'[^0-9.]', ' ', char)  
    credit_hours = cleaned_char.strip()
    credit_hours = re.sub(r'[.,]$', '', credit_hours).split()
    if len(credit_hours) > 1:
        credit_hours = credit_hours[-1]
    else:
        credit_hours = credit_hours[0]

    return float(credit_hours)


def clean_course_data(file_path: str):
    rows = []
    unique_type_codes = ["DIS", "LAB", "LEC", "LCD", "IND", "INT", "LBD", "ONL", "OD", "OLC", "OLB", "RES"]
    course_df = pd.read_csv(file_path)
    course_df = course_df[
        course_df['Type Code'].isin(unique_type_codes)
    ]
    course_df = course_df.drop_duplicates()
    
    for index, row in course_df.iterrows():
        course_year = row['Year']
        course_term = row['Term'].lower()
        course_subject = row['Subject'].lower()
        course_number = row['Number']
        course_name = row['Name'].lower()
        try:
            course_description = row['Description'].lower()
        except:
            course_description = ""
        course_credit_hours = clean_credit_hours(row['Credit Hours'])
        # course_section_info
        course_registration_number = row['CRN']
        course_type = row['Type'].lower()
        course_type_code = row['Type Code'].lower()

        try:
            course_start_time = pd.to_datetime(row['Start Time'], format='%I:%M %p').strftime('%I:%M %p')
            course_end_time = pd.to_datetime(row['End Time'], format='%I:%M %p').strftime('%I:%M %p')
        except ValueError:
            course_start_time = 'NO TIME'

        try: 
            course_day_of_week = list(row['Days of Week'])
        except:
            course_day_of_week = "NA"

        rows.append({
            "year": course_year,
            "term": course_term,
            "subject": course_subject,
            "number": course_number,
            "name": course_name,
            "description": course_description,
            "credit_hours": course_credit_hours,
            "registration_number": course_registration_number,
            "type": course_type,
            "type_code": course_type_code,
            "start_time": course_start_time,
            "end_time": course_end_time,
            "days_of_week": course_day_of_week
        })
    columns = [
        "year", "term", "subject", "number", "name", "description", "credit_hours",
        "registration_number", "type", "type_code", "start_time", "end_time", "days_of_week"
    ]
    
    return pd.DataFrame(rows, columns=columns)

