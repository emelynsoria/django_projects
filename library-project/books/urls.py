# from django.urls import path
# from .views import BookList, BookDetail, BookCreate, BookUpdate, BookDelete

# urlpatterns = [
#     path("", BookList.as_view(), name="book_home"),
#     path("book/<int:pk>/view/", BookDetail.as_view(), name="book_detail"),
#     path("book/new/", BookCreate.as_view(), name="book_create"),
#     path("book/edit/<int:pk>/", BookUpdate.as_view(), name="book_edit"),
#     path("book/<int:pk>/delete/", BookDelete.as_view(), name="book_delete"),
# ]

from django.urls import path

from books import views

urlpatterns = [
    path("", views.book_list, name="book_home"),
    path("view/<int:pk>", views.book_view, name="book_detail"),
    path("new", views.book_create, name="book_create"),
    path("edit/<int:pk>", views.book_update, name="book_edit"),
    path("delete/<int:pk>", views.book_delete, name="book_delete"),
]
