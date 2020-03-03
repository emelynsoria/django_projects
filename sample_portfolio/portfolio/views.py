from django.shortcuts import render
from .models import Projects


# def portfolio(request):
#     projects = Projects.objects.all()
#     context = {"projects": projects}
#     return render(request, "portfolio/index.html", context)


def project_index(request):
    projects = Projects.objects.all()
    context = {"projects": projects}
    return render(request, "portfolio/project_index.html", context)


def project_detail(request, pk):
    project = Projects.objects.get(pk=pk)
    context = {"project": project}
    return render(request, "project_detail.html", context)

