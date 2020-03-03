from django.contrib.auth.models import User
from django.db.models.functions import Length
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, generics, filters
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly,
    IsAuthenticated,
    AllowAny,
)


from .serializers import (
    UserPasswordChangeSerializer,
    UserSerializer,
    ProfileSerializer,
    GetProfileSerializer,
    ContactSerializer,
    GetContactSerializer,
    OtherContactSerializer,
    GetOtherContactSerializer,
    EducBackgroundSerializer,
    GetEducBackgroundSerializer,
    SkillSerializer,
    GetSkillSerializer,
    WorkExpSerializer,
    GetWorkExpSerializer,
    ProjectSerializer,
    GetProjectSerializer,
    AwardSerializer,
    GetAwardSerializer,
)
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


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = UserPasswordChangeSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = User.objects.all()

    def get_object(self, queryset=None):
        return self.request.user


class UserView(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
    queryset = User.objects.all()


class ProfileView(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()


class GetProfileView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Profile.objects.all()
    serializer_class = GetProfileSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user"]


class ContactView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = ContactSerializer
    queryset = Contact.objects.all().order_by("-contact_type")


class UserContactView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Contact.objects.all().order_by("-contact_type")
    serializer_class = GetContactSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["profile"]


class OtherContactView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = OtherContactSerializer
    queryset = OtherContact.objects.all().order_by("site")


class UserOtherContactView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = OtherContact.objects.all().order_by("site")
    serializer_class = GetOtherContactSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["profile"]


class EducationalBackgroundView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = EducBackgroundSerializer
    queryset = EducationalBackground.objects.all().order_by("-school_duration")


class UserEducationalBackgroundView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = EducationalBackground.objects.all().order_by("-school_duration")
    serializer_class = GetEducBackgroundSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user"]


class SkillView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = SkillSerializer
    queryset = Skill.objects.all().order_by(Length("skill"))


class UserSkillView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Skill.objects.all().order_by(Length("skill"))
    serializer_class = GetSkillSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user"]


class WorkExperienceView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = WorkExpSerializer
    queryset = WorkExperience.objects.all().order_by("-inclusive_dates")


class UserWorkExperienceView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = WorkExperience.objects.all().order_by("-inclusive_dates")
    serializer_class = GetWorkExpSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user"]


class ProjectView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = ProjectSerializer
    queryset = Project.objects.all().order_by("-date_added")


class UserProjectView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Project.objects.all().order_by("-date_added")
    serializer_class = GetProjectSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user"]


class AwardView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = AwardSerializer
    queryset = Award.objects.all().order_by(Length("award_title"))


class UserAwardView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Award.objects.all().order_by(Length("award_title"))
    serializer_class = GetAwardSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user"]
