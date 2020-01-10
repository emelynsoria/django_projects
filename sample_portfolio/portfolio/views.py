from django.shortcuts import render
from .models import Projects


def portfolio(request):
    projects = Projects.objects.all()
    context = {"projects": projects}
    return render(request, "portfolio/index.html", context)

