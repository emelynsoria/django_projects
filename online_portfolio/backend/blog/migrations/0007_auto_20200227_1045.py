# Generated by Django 3.0.2 on 2020-02-27 02:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("blog", "0006_post_is_draft"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="date_posted",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
