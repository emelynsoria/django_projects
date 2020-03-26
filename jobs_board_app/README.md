# Django Signals - Jobs Board sample project

This repository contains code from this [blog](https://stackabuse.com/using-django-signals-to-simplify-and-decouple-code/)


#### django models - makes use of abstract models

	class CommonInfo(models.Model):
	    first_name = models.CharField(max_length=100, default='', blank=True)
	    last_name = models.CharField(max_length=100, default='', blank=True)

	    class Meta:
	        abstract = True

	...

	class Subscriber(CommonInfo):
	    email = models.CharField(max_length=255, blank=False, unique=True)
	    date_created = models.DateTimeField(auto_now_add=True)
	    date_modified = models.DateTimeField(auto_now=True)

	    def __str__(self):
	        return self.email

### Set up the environment
	$ pipenv install --three

### Activate the virtual environment using Pipenv
	$ pipenv install && pipenv shell

### Install the packages from requirements.txt
	$ pip install -r requirements.txt

### Create the project
	$ django-admin startproject jobs_board && cd jobs_board

### Create the decoupled applications
	
	$ django-admin startapp jobs_board_main
	$ django-admin startapp jobs_board_notifications
	

### Setup database
	$ python manage.py migrate


### Run the server
	$ python manage.py runserver

#### Then open [http://localhost:8000/jobs](http://localhost:8000/jobs "(target|_blank)") in browser
#### or open the Admin Site in [http://localhost:8000/admin](http://localhost:8000/admin "(target|_blank)")
