# Generated by Django 3.0.2 on 2020-02-11 07:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("portfolio", "0008_auto_20200211_1546"),
    ]

    operations = [
        migrations.AlterField(
            model_name="profile",
            name="about",
            field=models.TextField(blank=True, default=""),
        ),
    ]