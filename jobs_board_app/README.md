# Jobs Board application using django signals

## Set up the environment
	$ pipenv install --three

## Activate the virtual environment
	$ pipenv shell

## Install Django
	$ pipenv install django

## Create the project
	$ django-admin startproject jobs_board && cd jobs_board

## Create the decoupled applications
	
	$ django-admin startapp jobs_board_main
	$ django-admin startapp jobs_board_notifications
	

## Setup database
	$ python manage.py migrate


## Run server
	$ python manage.py runserver
