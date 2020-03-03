from datetime import datetime
from datetime import date
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .serializers import UserSerializer
from .models import Profile
import os
import io
from PIL import Image


class UserTestCase(APITestCase):
    def generate_photo_file(self):
        file = io.BytesIO()
        image = Image.new("RGBA", size=(100, 100), color=(155, 0, 0))
        image.save(file, "png")
        file.name = "test_photo.png"
        file.seek(0)
        return file

    def setUp(self):
        # user1
        self.first_name = "myname"
        self.last_name = "mylastname"
        self.username = "myuname"
        self.password = "someStrongPass1234"
        # user2
        self.first_name2 = "troye"
        self.last_name2 = "sivan"
        self.username2 = "troye"
        self.password2 = "myPass9876"
        self.is_superuser = False

        data = [
            {
                "first_name": self.first_name,
                "last_name": self.last_name,
                "username": self.username,
                "password": self.password,
            },
            {
                "first_name": self.first_name2,
                "last_name": self.last_name2,
                "username": self.username2,
                "password": self.password2,
            },
        ]

        # registration
        for each in data:
            response = self.client.post("/api/users/", each, format="json")
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
            self.id = response.json()["id"]
            # create profile
            createProfileResponse = self.client.post("/api/profile/", {"user": self.id})
            self.assertEqual(createProfileResponse.status_code, status.HTTP_201_CREATED)

        # login
        userData = {"username": self.username2, "password": self.password2}
        self.userId = User.objects.get(username=self.username2).id
        response = self.client.post("/api/token/", userData, format="json")
        self.assertEqual(200, response.status_code)
        self.profileId = Profile.objects.get(user=self.userId).id
        self.token = response.json()["access"]
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)

        """ post contacts """
        contactData = [
            {
                "contact_type": "website",
                "contact_details": "chloemoretz.org",
                "profile": self.profileId,
            },
            {
                "contact_type": "mobile",
                "contact_details": "11111111",
                "profile": self.profileId,
            },
            {
                "contact_type": "email",
                "contact_details": "chloegmoretz@sample.com",
                "profile": self.profileId,
            },
        ]

        for each in contactData:
            contactResponse = self.client.post("/api/contact/", each, format="json")
            self.assertEqual(contactResponse.status_code, status.HTTP_201_CREATED)

        """ post other contacts """
        otherContactData = [
            {
                "site": "ig",
                "link": "instagram.com/sample_instagram_link_here",
                "profile": self.profileId,
            },
            {
                "site": "fb",
                "link": "facebook.com/sample_facebook_link_here",
                "profile": self.profileId,
            },
        ]

        for each in otherContactData:
            otherContactResponse = self.client.post(
                "/api/other_contacts/", each, format="json"
            )
            self.assertEqual(otherContactResponse.status_code, status.HTTP_201_CREATED)

        """ post education record """
        educData = {
            "school_name": "Sample School Name",
            "school_duration": "2020 – Present",
            "school_type": "Master's Degree",
            "school_description": "Lorem ipsum dolor sit amet...",
            "user": self.userId,
        }

        educResponse = self.client.post("/api/education/", educData)
        self.assertEqual(educResponse.status_code, status.HTTP_201_CREATED)
        self.educId = educResponse.json()["id"]

        """ post work experience record """
        workData = {
            "job_title": "Sample Job Title",
            "work_description": "sample description here",
            "location": "",
            "inclusive_dates": "January 2020 – Present",
            "user": self.userId,
        }
        workResponse = self.client.post("/api/work_experience/", workData)
        self.assertEqual(workResponse.status_code, status.HTTP_201_CREATED)
        self.workId = workResponse.json()["id"]

        """ post skills record """
        photo_file = self.generate_photo_file()

        skillData = [
            {
                "skill": "Sample skill",
                "skill_details": "Lorem ipsum dolor sit amet, consectetur  Lorem ipsum dolor sit amet, consectetur. Lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consecteturfg",
                "skill_photo": photo_file,
                "user": self.userId,
            },
            {
                "skill": "Anader skill",
                "skill_details": "",
                "skill_photo": "",
                "user": self.userId,
            },
        ]
        for each in skillData:
            skillResponse = self.client.post("/api/skills/", each)
            self.assertEqual(skillResponse.status_code, status.HTTP_201_CREATED)

        projectData = [
            {
                "project_title": "Sample Project Title",
                "project_description": "Lorem ipsum dolor sit amet, consectetur  Lorem ipsum dolor sit amet, consectetur.",
                "project_photo": "",
                "date_added": datetime.now(),
                "user": self.userId,
            },
            {
                "project_title": "Another Project Title",
                "project_description": "Lorem ipsum dolor sit amet, consectetur  Lorem ipsum dolor sit amet, consectetur.",
                "project_photo": "",
                "date_added": datetime.now(),
                "user": self.userId,
            },
        ]
        for each in projectData:
            projectResponse = self.client.post(
                "/api/projects/", each, format="multipart"
            )
            self.assertEqual(projectResponse.status_code, status.HTTP_201_CREATED)

        awardData = [
            {
                "award_title": "1st Award",
                "award_detail": "sample details here",
                "award_date": date.today(),
                "user": self.userId,
            },
            {
                "award_title": "2nd Award",
                "award_detail": "",
                "award_date": date.today(),
                "user": self.userId,
            },
        ]
        for each in awardData:
            awardResponse = self.client.post("/api/awards/", each, format="json")
            self.assertEqual(awardResponse.status_code, status.HTTP_201_CREATED)

    def test_get_all_users(self):
        response = self.client.get("/api/users/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_details(self):
        response = self.client.get(f"/api/users/{self.userId}/",)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_user(self):
        data = {
            "first_name": "newname",
            "last_name": "newlastname",
            "username": "newuname",
            "password": "newStrongPass1234",
        }

        response = self.client.patch(f"/api/users/{self.userId}/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_all_profile(self):
        response = self.client.get("/api/profile/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_profile(self):
        response = self.client.get("/api/user/profile/?", user={self.userId})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_profile_details(self):
        response = self.client.get(f"/api/profile/{self.userId}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_profile(self):
        photo_file = self.generate_photo_file()

        data = {
            "user_photo": photo_file,
            "profession": "Stockholder",
            "about": "Hi! Welcome to my portfolio. Enjoy!!!!!",
            "user": self.userId,
        }

        response = self.client.patch(
            f"/api/profile/{self.profileId}/", data, format="multipart"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ContactTestCase(UserTestCase, APITestCase):
    def test_get_user_contacts(self):
        response = self.client.get(f"/api/user/contacts/?", profile={self.profileId})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_contact_details(self):
        response = self.client.get("/api/contact/1/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_contact(self):
        data = {
            "contact_type": "mobile",
            "contact_details": "987-6543-210",
        }

        response = self.client.patch("/api/contact/2/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_contact(self):
        response = self.client.delete("/api/contact/3/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class OtherContactTestCase(UserTestCase, APITestCase):
    def test_get_user_other_contacts(self):
        response = self.client.get(
            f"/api/user/other_contacts/?", profile={self.profileId}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_contact_details(self):
        response = self.client.get("/api/other_contacts/1/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_other_contact(self):
        data = {
            "site": "git",
            "link": "github.com/mysamplelink",
        }

        response = self.client.patch("/api/other_contacts/2/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_other_contact(self):
        response = self.client.delete("/api/other_contacts/1/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class EducationalBackgroundTestCase(UserTestCase, APITestCase):
    def test_get_user_education(self):
        response = self.client.get(f"/api/user/education/?", user={self.userId})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_education_details(self):
        response = self.client.get(f"/api/education/{self.educId}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_education(self):
        data = {
            "school_name": "Massachusetts Institute of Technology",
        }

        response = self.client.patch(f"/api/education/{self.educId}/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ExperienceTestCase(UserTestCase, APITestCase):
    def test_get_user_experience(self):
        response = self.client.get(f"/api/user/work_experience/?", user={self.userId})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_experience_details(self):
        response = self.client.get(f"/api/work_experience/{self.workId}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_experience(self):
        data = {
            "job_title": "Software Engineer",
            "location": "Google",
        }

        response = self.client.patch(f"/api/work_experience/{self.workId}/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class SkillTestCase(UserTestCase, APITestCase):
    def test_get_user_skills(self):
        response = self.client.get(f"/api/user/skills/?", user={self.userId})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_skill_details(self):
        response = self.client.get(f"/api/skills/1/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_skill(self):
        data = {"skill": "Machine Learning", "user": self.userId}

        response = self.client.patch("/api/skills/1/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_skill(self):
        response = self.client.delete(f"/api/skills/2/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class ProjectTestCase(UserTestCase, APITestCase):
    def test_get_user_projects(self):
        response = self.client.get(f"/api/user/projects/?", user={self.userId})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_project_details(self):
        response = self.client.get("/api/projects/1/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_project(self):
        data = {
            "project_title": "ABC Augmented Reality Application",
            "user": self.userId,
        }

        response = self.client.patch(f"/api/projects/1/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_skill(self):
        response = self.client.delete(f"/api/projects/2/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class AwardTestCase(UserTestCase, APITestCase):
    def test_get_user_awards(self):
        response = self.client.get(f"/api/user/awards/?", user={self.userId})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_award_details(self):
        response = self.client.get("/api/awards/1/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_award(self):
        data = {"award_title": "Best in Design", "user": self.userId}

        response = self.client.patch("/api/awards/1/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_award(self):
        response = self.client.delete("/api/awards/2/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
