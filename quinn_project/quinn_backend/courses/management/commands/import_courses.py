import pandas as pd
from django.core.management.base import BaseCommand, CommandError
from courses.models import Course
from pathlib import Path

class Command(BaseCommand):
    help = 'Import courses from a CSV file.'

    def add_arguements(self, parser):
        parser.add_argument('csv_file' , type=str, help="Path to the CSV file with coures data.")

    def handle(self, *args, **options):
        csv_file = options['csv_file']
        file_path = Path(csv_file)

        if not file_path.exists():
            raise CommandError(f"File {csv_file} does not exist.")
        
        try:
            df = pd.read_csv(csv_file)
        except Exception as e:
            raise CommandError(f"Error reading CSV file: {e}")
        
        count = 0

        for index, row in df.iterrows():
            major = str(row.get('Major', '')).strip()
            year = str(row.get('Year', '')).strip()
            term = str(row.get('Term', '')).strip()
            course_code = str(row.get('Course Code', '')).strip() or None  
            course_name = str(row.get('Course Name', '')).strip()
            hours_raw = row.get('Hours', 0)
            try:
                hours = float(hours_raw)
            except (ValueError, TypeError):
                hours = 0

            Course.objects.update_or_create(
                major=major,
                year=year,
                term=term,
                course_code=course_code,
                course_name=course_name,
                defaults={'hours': hours}
            )
            count += 1

        self.stdout.write(self.style.SUCCESS(f"Successfully imported {count} courses using pandas."))