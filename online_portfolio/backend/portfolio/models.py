from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.core.files.uploadedfile import InMemoryUploadedFile
from PIL import Image
from io import BytesIO


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profiles")
    user_photo = models.ImageField(null=True, upload_to="profile_pics")
    profession = models.CharField(max_length=150, default="", blank=True)
    about = models.TextField(default="Hi! Welcome to my portfolio.")

    def __str__(self):
        return f"{self.user.username}"


class Contact(models.Model):
    profile = models.ForeignKey(
        Profile, related_name="contacts", on_delete=models.CASCADE
    )
    TYPE_CHOICES = [
        ("address", "Address"),
        ("website", "Website"),
        ("email", "Email Address"),
        ("mobile", "Mobile"),
    ]
    contact_type = models.CharField(max_length=8, choices=TYPE_CHOICES)
    contact_details = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.contact_type}: {self.contact_details}"


class OtherContact(models.Model):
    profile = models.ForeignKey(
        Profile, related_name="other_contacts", on_delete=models.CASCADE
    )
    SITE_CHOICES = [
        ("fb", "Facebook"),
        ("ig", "Instagram"),
        ("tw", "Twitter"),
        ("yt", "Youtube"),
        ("li", "Linkedin"),
        ("git", "Github"),
        ("bit", "Bitbucket"),
        ("ot", "Others"),
    ]
    site = models.CharField(max_length=3, choices=SITE_CHOICES)
    link = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.site}: {self.link}"


class EducationalBackground(models.Model):
    user = models.ForeignKey(User, related_name="education", on_delete=models.CASCADE)
    school_name = models.CharField(max_length=150)
    school_duration = models.CharField(max_length=20)
    school_type = models.CharField(max_length=40, default="", blank=True)
    school_description = models.TextField()

    def __str__(self):
        return f"{self.user.username}'s study in {self.school_name}"


class Skill(models.Model):
    user = models.ForeignKey(User, related_name="skills", on_delete=models.CASCADE)
    skill = models.CharField(max_length=50)
    skill_details = models.CharField(max_length=250, default="", blank=True)
    skill_photo = models.ImageField(blank=True, null=True, upload_to="skills")

    def __str__(self):
        return f"{self.skill}"


class WorkExperience(models.Model):
    user = models.ForeignKey(User, related_name="experiences", on_delete=models.CASCADE)
    job_title = models.CharField(max_length=50, default="", blank=True)
    work_description = models.TextField()
    location = models.CharField(max_length=100, default="", blank=True)
    inclusive_dates = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.job_title}"


class Project(models.Model):
    user = models.ForeignKey(User, related_name="projects", on_delete=models.CASCADE)
    project_title = models.CharField(max_length=150)
    project_description = models.TextField()
    project_photo = models.ImageField(blank=True, null=True, upload_to="projects")
    date_added = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.project_title}"


class Award(models.Model):
    user = models.ForeignKey(User, related_name="awards", on_delete=models.CASCADE)
    award_title = models.CharField(max_length=100)
    award_detail = models.CharField(max_length=200, default="", blank=True)
    award_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.award_title}"
