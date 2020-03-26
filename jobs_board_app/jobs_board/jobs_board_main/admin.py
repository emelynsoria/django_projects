from django.contrib import admin
from .models import Job, Subscriber, Subscription

class JobAdmin(admin.ModelAdmin):
	list_display=('company', 'company_email', 'title', 'status', 'date_created', 'date_modified')

class SubscriberAdmin(admin.ModelAdmin):
	list_display=('email', 'date_created', 'date_modified')

class SubscriptionAdmin(admin.ModelAdmin):
	list_display=('user', 'job', 'date_created', 'date_modified')

admin.site.register(Job, JobAdmin)
admin.site.register(Subscriber, SubscriberAdmin)
admin.site.register(Subscription, SubscriptionAdmin)