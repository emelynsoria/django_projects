# Django Signals - Jobs Board sample project

This repository contains code from this [blog](https://stackabuse.com/using-django-signals-to-simplify-and-decouple-code/)


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
