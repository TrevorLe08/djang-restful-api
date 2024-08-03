# RESTFUL API WITH DJANGO

## Requirement

- Install Node JS
- Install Python 3
- Install package python below:
  - django: v5.0.6
  - djangorestframework: v3.15.2
  - django-cors-headers: v4.4.0

## There are steps to run project

-  ### Setup database and run restful api
```
python manage.py migrate
python manage.py runserver
```
Server will connect at http://localhost:8000 or http://127.0.0.1:8000

- ### Install node_modules and run website
```
npm install
npm run dev
```
Website will run at http://localhost:5173