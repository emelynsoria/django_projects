from django.shortcuts import render, get_object_or_404
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.models import User
from django.views.generic import (
    ListView,
    DetailView,
    CreateView,
    UpdateView,
    DeleteView,
)
from .models import Post

# # dummy data to be used in posts
# post_list = [
#     {
#         "author": "CoreyMS",
#         "title": "Blog Post 1",
#         "content": "First post content",
#         "date_posted": "August 27, 2018",
#     },
#     {
#         "author": "Em Riego",
#         "title": "Blog Post 2",
#         "content": "Second post content",
#         "date_posted": "January 7, 2020",
#     },
# ]


def home(request):
    # # 'posts' as key for 'post_list' list, w/c will be accessible in the template
    # context = {"posts": post_list}

    context = {"posts": Post.objects.all()}
    return render(request, "blog/index.html", context)


class PostListView(ListView):
    model = Post

    # will look for <app>/<model>_<viewtype>.html     # ex: blog/post_list.html
    template_name = "blog/index.html"
    context_object_name = "posts"
    ordering = ["-date_posted"]  # DESC; newest to oldest
    paginate_by = 2


class PostDetailView(DetailView):
    model = Post
    # # with or without 'template_name' since it's already linked in index.html
    # template_name = "blog/post_detail.html"


class PostCreateView(LoginRequiredMixin, CreateView):
    model = Post
    fields = ["title", "content"]

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)


class PostUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Post
    fields = ["title", "content"]

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False


class PostDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Post
    success_url = "/"

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False


class UserPostListView(ListView):
    model = Post

    template_name = "blog/user_posts.html"  # <app>/<model>_<viewtype>.html
    context_object_name = "posts"
    ordering = ["-date_posted"]
    paginate_by = 2

    def get_queryset(self):
        user = get_object_or_404(User, username=self.kwargs.get("username"))
        return Post.objects.filter(author=user).order_by("-date_posted")


def about(request):
    return render(request, "blog/about.html", {"title": "About"})

