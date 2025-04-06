from django.conf import settings
from django.db import models

class Course(models.Model):
    major = models.CharField(max_length=255)
    year = models.CharField(max_length=50)
    term = models.CharField(max_length=50)
    course_code = models.CharField(max_length=50, blank=True, null=True)
    course_name = models.CharField(max_length=255)
    hours = models.DecimalField(max_digits=4, decimal_places=1)

    def __str__(self):
        return f"{self.major} - {self.course_code or 'ELECTIVE'}: {self.course_name}"

class StudentProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    major = models.CharField(max_length=255)
    entry_year = models.IntegerField(null=True, blank=True)
    expected_grad_year = models.IntegerField(null=True, blank=True)

    taken_courses = models.ManyToManyField('Course', blank=True, related_name='students_taken')

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.major})"

class CoursePlan(models.Model):
    student = models.ForeignKey('StudentProfile', on_delete=models.CASCADE, related_name='course_plans')
    selected_courses = models.ManyToManyField(Course, blank=True)
    validation_info = models.JSONField(default=dict, blank=True)
    cleared = models.BooleanField(default=False)

    def __str__(self):
        return f"Course Plan for {self.student}"