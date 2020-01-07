# from django.http import HttpResponse
from django.shortcuts import render
from .models import Post

# # dummy data
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
    # return HttpResponse("<h1>Blog Home</h1>")

    # # 'posts' as key for post_list list, w/c will be accessible in the template
    # context = {"posts": post_list}
    context = {"posts": Post.objects.all()}
    return render(request, "blog/index.html", context)


def about(request):
    # return HttpResponse("<h1>About Page</h1>")
    return render(request, "blog/about.html", {"title": "About"})

