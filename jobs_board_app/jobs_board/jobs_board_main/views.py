from django.shortcuts import render
from .models import Job, Subscriber, Subscription
from .signals import new_subscriber


def get_jobs(request):
    # get all jobs from the DB
    jobs = Job.objects.all()
    return render(request, 'jobs.html', {'jobs': jobs})

def get_job(request, id):
    job = Job.objects.get(pk=id)
    return render(request, 'job.html', {'job': job})

def subscribe(request, id):
    job = Job.objects.get(pk=id)
    subscriber = Subscriber(first_name=request.POST['first_name'], last_name=request.POST['last_name'], email=request.POST['email'])
    subscriber.save()

    subscription = Subscription(user=subscriber, job=job)
    subscription.save()

    new_subscriber.send(sender=subscription, job=job, subscriber=subscriber)

    payload = {
      'job': job,
      'first_name': request.POST['first_name'],
      'last_name': request.POST['last_name'],
      'email': request.POST['email']
    }
    return render(request, 'subscribed.html', {'payload': payload})