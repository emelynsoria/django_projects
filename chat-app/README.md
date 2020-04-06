# Django Channels - Chat Application sample project

This repository contains code from this [tutorial](https://channels.readthedocs.io/en/latest/tutorial/part_1.html)

## Technologies
	- Django ( Channels )
	- Docker
	- WebSocket
	
## Setup

### Check the django version:
	$ python -m django --version

### Run the command below to check if `Django Channels` has already been installed: 
	$ python -c 'import channels; print(channels.__version__)'

### If not, installed `Channels`:
	$ python -m pip install -U channels

### Setup database
	$ python manage.py migrate


### Run the server
	$ python manage.py runserver

#### Then open [http://localhost:8000/jobs](http://localhost:8000/) in browser
#### or open the Admin Site in [http://localhost:8000/admin](http://localhost:8000/admin)
