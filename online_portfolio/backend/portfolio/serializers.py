from rest_framework import serializers
from django.contrib.auth.models import User


from .models import (
    Profile,
    Contact,
    OtherContact,
    EducationalBackground,
    Skill,
    WorkExperience,
    Project,
    Award,
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "username",
            "password",
            "is_superuser",
        ]

    def create(self, validate_data):
        password = validate_data.pop("password")
        user = User(**validate_data)
        user.set_password(password)
        user.save()
        return user


class UserPasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, max_length=30)
    password = serializers.CharField(required=True, max_length=30)
    confirmed_password = serializers.CharField(required=True, max_length=30)

    def validate(self, data):
        if not self.context["request"].user.check_password(data.get("old_password")):
            raise serializers.ValidationError({"old_password": "Wrong password."})

        if data.get("confirmed_password") != data.get("password"):
            raise serializers.ValidationError(
                {"password": "Password must be confirmed correctly."}
            )

        return data

    def update(self, instance, validated_data):
        instance.set_password(validated_data["password"])
        instance.save()
        return instance

    @property
    def data(self):
        return {"result": "Password changed successfully", "status": "ok"}


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class GetProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"
        depth = 1


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"


class GetContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"
        depth = 2


class OtherContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = OtherContact
        fields = "__all__"


class GetOtherContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = OtherContact
        fields = "__all__"
        depth = 2


class EducBackgroundSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationalBackground
        fields = "__all__"


class GetEducBackgroundSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationalBackground
        fields = "__all__"
        depth = 1


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"


class GetSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"
        depth = 1


class WorkExpSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkExperience
        fields = "__all__"


class GetWorkExpSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkExperience
        fields = "__all__"
        depth = 1


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class GetProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
        depth = 1


class AwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Award
        fields = "__all__"


class GetAwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Award
        fields = "__all__"
        depth = 1
