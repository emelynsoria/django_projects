# Generated by Django 3.0.2 on 2020-02-19 03:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("portfolio", "0015_auto_20200219_1144"),
    ]

    operations = [
        migrations.AlterField(
            model_name="profile",
            name="about",
            field=models.TextField(default="Hi! Welcome to my portfolio."),
        ),
    ]
