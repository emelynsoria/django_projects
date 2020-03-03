from django.contrib import admin
from .models import Post, Comment


class PostAdmin(admin.ModelAdmin):
    list_display = ("user", "title", "content", "date_posted", "blog_photo", "is_draft")


class CommentAdmin(admin.ModelAdmin):
    list_display = ("user", "post", "content", "created_on")


admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
