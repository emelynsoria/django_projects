from django.db import models
from django.urls import reverse


class Book(models.Model):
    book_name = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    genre = models.CharField(max_length=200)
    pages = models.IntegerField(default=0)

    def __str__(self):
        return self.book_name

    def get_absolute_url(self):
        return reverse("book_edit", kwargs={"pk": self.pk})
