# from django.shortcuts import render
# from django.views.generic import ListView, DetailView
# from django.views.generic.edit import CreateView, UpdateView, DeleteView
# from django.urls import reverse_lazy
# from .models import Book


# class BookList(ListView):
#     model = Book
#     template_name = "books/index.html"


# class BookDetail(DetailView):
#     model = Book


# class BookCreate(CreateView):
#     model = Book
#     fields = ["book_name", "author", "genre", "pages"]
#     success_url = reverse_lazy("book_home")


# class BookUpdate(UpdateView):
#     model = Book
#     fields = ["book_name", "author", "genre", "pages"]
#     success_url = reverse_lazy("book_home")


# class BookDelete(DeleteView):
#     model = Book
#     success_url = reverse_lazy("book_home")


from django.shortcuts import render, redirect, get_object_or_404
from django.forms import ModelForm

from books.models import Book


class BookForm(ModelForm):
    class Meta:
        model = Book
        fields = ["book_name", "author", "genre", "pages"]


def book_list(request, template_name="books/index.html"):
    book = Book.objects.all()
    data = {}
    data["object_list"] = book
    return render(request, template_name, data)


def book_view(request, pk, template_name="books/book_detail.html"):
    book = get_object_or_404(Book, pk=pk)
    return render(request, template_name, {"object": book})


def book_create(request, template_name="books/book_form.html"):
    form = BookForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect("book_home")
    return render(request, template_name, {"form": form})


def book_update(request, pk, template_name="books/book_form.html"):
    book = get_object_or_404(Book, pk=pk)
    form = BookForm(request.POST or None, instance=book)
    if form.is_valid():
        form.save()
        return redirect("book_home")
    return render(request, template_name, {"form": form})


def book_delete(request, pk, template_name="books/book_confirm_delete.html"):
    book = get_object_or_404(Book, pk=pk)
    if request.method == "POST":
        book.delete()
        return redirect("book_home")
    return render(request, template_name, {"object": book})

