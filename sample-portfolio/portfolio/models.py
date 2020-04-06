from django.db import models
from django.contrib.auth.models import User
from PIL import Image


class Projects(models.Model):
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    proj_title = models.CharField(max_length=150)
    proj_description = models.TextField()
    # proj_file = models.FilePathField(default="none", upload_to="portfolio/projects")
    proj_photo = models.ImageField(default="none", upload_to="portfolio/projects")

    def __str__(self):
        return self.proj_title

    def save(self):
        super().save()

        img = Image.open(self.proj_photo.path)

        if img.height > 800 or img.width > 400:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.proj_photo.path)

