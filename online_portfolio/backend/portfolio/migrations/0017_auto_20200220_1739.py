# Generated by Django 3.0.2 on 2020-02-20 09:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("portfolio", "0016_auto_20200219_1149"),
    ]

    operations = [
        migrations.AlterField(
            model_name="skill",
            name="skill_details",
            field=models.CharField(blank=True, default="", max_length=250),
        ),
    ]