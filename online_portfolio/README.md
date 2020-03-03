# Online Portfolio Application

## Overview

This application is an online portfolio wherein users can store their personal and professional data in their portfolio as well as showcase their works or whereabouts through posting or blogs. All users will be able to see posts of each other and they can post comments on it as well. Through the post author’s name, they can view each other’s portfolio.

All users are accessible which means that there is no need for connecting to or following other users. Anyone can view someone else's portfolio or published blogs.

## Setup

- Clone the repository:

  ```bash
  $ git clone https://dev.izeni.net/boom-backend-19/online-portfolio-app.git
  ```

- Then go to project:

  ```bash
  $ cd online-portfolio-app

  ```

- Navigate to `/backend`
- Then, create a virtual environment:

  ```bash
  $ pipenv shell
  ```

- Install requirements from `requirements.txt`:

  ```bash
  $ pip install -r requirements.txt
  ```

- Setup the database:

  ```bash
  $ python manage.py migrate
  ```

- Then create a superuser account:

  ```bash
  $ python manage.py createsuperuser

  ```

- Navigate to `/frontend`
- Then, install yarn packages:
  ```bash
  $ yarn install
  ```

## Run Server

##### Backend

- Run: `python manage.py runserver`

##### Frontend

- Run: `yarn start`

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Tests

- To run tests for this project, navigate to `/backend` and run `python manage.py test`
