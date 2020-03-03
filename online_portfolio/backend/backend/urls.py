"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings  # an object for enabling media files
from django.conf.urls.static import static  # serving static files during dev't
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from portfolio.views import (
    UserView,
    ProfileView,
    GetProfileView,
    ContactView,
    UserContactView,
    OtherContactView,
    UserOtherContactView,
    EducationalBackgroundView,
    UserEducationalBackgroundView,
    SkillView,
    UserSkillView,
    WorkExperienceView,
    UserWorkExperienceView,
    ProjectView,
    UserProjectView,
    AwardView,
    UserAwardView,
    ChangePasswordView,
)
from blog.views import PostView, UserPostView, CommentView, PostCommentView, CommentPostView


# ----- portfolio app -----
router = routers.DefaultRouter()
router.register(r"users", UserView)
router.register(r"profile", ProfileView, "profile")
router.register(r"user/profile", GetProfileView, "user_profile")
router.register(r"contact", ContactView, "contacts")
router.register(r"user/contacts", UserContactView, "user_contacts")
router.register(r"other_contacts", OtherContactView, "other_contacts")
router.register(r"user/other_contacts", UserOtherContactView, "user_other_contacts")
router.register(r"education", EducationalBackgroundView, "education")
router.register(r"user/education", UserEducationalBackgroundView, "user_education")
router.register(r"skills", SkillView, "skills")
router.register(r"user/skills", UserSkillView, "user_skills")
router.register(r"work_experience", WorkExperienceView, "experience")
router.register(r"user/work_experience", UserWorkExperienceView, "user_experience")
router.register(r"projects", ProjectView, "projects")
router.register(r"user/projects", UserProjectView, "user_projects")
router.register(r"awards", AwardView, "awards")
router.register(r"user/awards", UserAwardView, "user_awards")
# ----- blog app -----
router.register(r"blog", PostView, "blogs")
router.register(r"user/blogs", UserPostView, "user_blogs")
router.register(r"comments", CommentView, "comments")
router.register(r"blog_comments", PostCommentView, "blog_comments")
router.register(r"post_comments", CommentPostView, "post_comments")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/token/", TokenObtainPairView.as_view()),
    path("api/token/refresh/", TokenRefreshView.as_view()),
    path("api/change_password/", ChangePasswordView.as_view()),
    path("api/", include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
