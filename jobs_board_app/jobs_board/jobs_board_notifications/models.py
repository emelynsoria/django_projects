from django.db import models

from django.db.models.signals import pre_delete
from django.dispatch import receiver

from jobs_board_main.signals import new_subscriber
from jobs_board_main.models import Job, Subscriber, Subscription

@receiver(new_subscriber, sender=Subscription)
def handle_new_subscription(sender, **kwargs):
    subscriber = kwargs['subscriber']
    job = kwargs['job']

    message = f"User {subscriber.email} has just subscribed to the Job {job.title}."
    # message = """User {} has just subscribed to the Job {}.
    # """.format(subscriber.email, job.title)

    print(message)

@receiver(pre_delete, sender=Job)
def handle_deleted_job_posting(**kwargs):
    job = kwargs['instance']

    # Find the subscribers list
    subscribers = Subscription.objects.filter(job=job)

    for subscriber in subscribers:
        # print('SUBSCRIBER: ', subscriber)
        # print('SUBSCRIBER NAME: ', subscriber.user)
        message = f"Dear {subscriber.user}, the job posting {job.title} by {job.company} has been taken down."

        print(message)