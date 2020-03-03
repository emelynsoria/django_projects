from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import (
    PostSerializer,
    UserPostSerializer,
    CommentSerializer,
    PostCommentSerializer,
    CommentPostSerializer,
)
from .models import Post, Comment


class PostView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = PostSerializer
    queryset = Post.objects.all().order_by("-date_posted")


class UserPostView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = UserPostSerializer
    queryset = Post.objects.all().order_by("-date_posted")
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user", "is_draft"]


class CommentView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = CommentSerializer
    queryset = Comment.objects.all().order_by("-created_on")


class PostCommentView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = PostCommentSerializer
    queryset = Comment.objects.all().order_by("-created_on")
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user", "post"]


class CommentPostView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = CommentPostSerializer
    queryset = Post.objects.all().order_by("-date_posted")
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user"]
