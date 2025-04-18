# Generated by Django 5.2 on 2025-04-06 07:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('major', models.CharField(max_length=100)),
                ('year', models.CharField(max_length=50)),
                ('term', models.CharField(max_length=50)),
                ('course_code', models.CharField(blank=True, max_length=20)),
                ('course_name', models.CharField(max_length=100)),
                ('hours', models.DecimalField(decimal_places=1, max_digits=4)),
            ],
        ),
    ]
