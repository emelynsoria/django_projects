# Generated by Django 3.0.2 on 2020-01-30 08:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("portfolio", "0004_auto_20200130_1528"),
    ]

    operations = [
        migrations.AlterField(
            model_name="skill",
            name="skill_photo",
            field=models.ImageField(blank=True, null=True, upload_to="skills"),
        ),
    ]
