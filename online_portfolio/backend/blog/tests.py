# from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

import os
import io
from PIL import Image


class BlogTestCase(APITestCase):
    def generate_photo_file(self):
        file = io.BytesIO()
        image = Image.new("RGBA", size=(100, 100), color=(155, 0, 0))
        image.save(file, "png")
        file.name = "test_photo.png"
        file.seek(0)
        return file

    def setUp(self):
        self.first_name = "myname"
        self.last_name = "mylastname"
        self.username = "myuname"
        self.password = "someStrongPass1234"
        self.user = User.objects.create_user(
            first_name=self.first_name,
            last_name=self.last_name,
            username=self.username,
            password=self.password,
        )

        self.userId = User.objects.get(username=self.username).id
        # create profile
        createProfileResponse = self.client.post("/api/profile/", {"user": self.userId})
        self.assertEqual(createProfileResponse.status_code, status.HTTP_201_CREATED)

        # login
        data = {"username": self.username, "password": self.password}
        response = self.client.post("/api/token/", data, format="json")
        self.assertEqual(200, response.status_code)
        # authentication
        self.token = response.json()["access"]
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)

        """ test for posting blog with photo """
        photo_file = self.generate_photo_file()
        blogData = [
            {
                "user": self.userId,
                "title": "My First Post",
                "content": "Hello Universe!!!",
                "blog_photo": photo_file,
            },
            {
                "user": self.userId,
                "title": "No Photo Post",
                "content": "sample content here for my second post",
                "blog_photo": "",
            },
            {
                "user": self.userId,
                "title": "",
                "content": "Another sample post\r\nsample content here",
                "blog_photo": "",
            },
        ]

        for each in blogData:
            response = self.client.post("/api/blog/", each, format="multipart")
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
            self.postId = response.json()["id"]

        """ test for posting comment """
        commentData = {
            "user": self.userId,
            "post": self.postId,
            "content": "Sample comment here",
        }

        response2 = self.client.post("/api/comments/", commentData)
        self.assertEqual(response2.status_code, status.HTTP_201_CREATED)
        self.commentId = response2.json()["id"]

    """ blogs """

    def test_get_all_blogs(self):
        response = self.client.get("/api/blog/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_blogs(self):
        response = self.client.get("/api/user/blogs/?", {"user": self.userId})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_blog_details(self):
        response = self.client.get(f"/api/blog/1/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_blog(self):
        data = {
            "user": self.userId,
            "title": "Updated Post Title",
            "content": "Hello Universe!!!",
            "blog_photo": "",
        }

        response = self.client.patch(f"/api/blog/1/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_remove_blog(self):
        response = self.client.delete(f"/api/blog/3/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    """ comments """

    def test_get_blog_comments(self):
        response = self.client.get("/api/post_comments/3/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_comment_details(self):
        response = self.client.get("/api/comments/1/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_comment(self):
        data = {"user": self.userId, "post": self.postId, "content": "Updated comment"}
        response = self.client.patch(f"/api/comments/{self.commentId}/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_remove_comment(self):
        response = self.client.delete(f"/api/comments/{self.commentId}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
