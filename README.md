# Project-Smoothies 
![workflow status](https://github.com/DHBW-Database-Project/Project-Smoothies/actions/workflows/docker-image.yml/badge.svg)
<img src="https://img.shields.io/badge/Python-grey?style=flat-square&logo=Python"/>
<img src="https://img.shields.io/badge/Postgres-grey?style=flat-square&logo=Postgresql"/>
<img src="https://img.shields.io/badge/Docker-grey?style=flat-square&logo=Docker"/>
<img src="https://img.shields.io/badge/Flask-v2.0.1-g?style=flat-square&logo=Flask"/>

## Steps to start application
to start application:
```
docker-compose build
docker-compose up
```
The application is now running on localhost:5001

to shutdown application:
```
doocker-compose down
```

## Steps to setup development environment
Install and create virtualenv
```
cd Application
pip install virtualenv
virtualenv env
```
To activate virtualenv on windows (works only on cmd):
```
env\Scripts\activate
```
Install dependencies
```
pip install -r requirements.txt
```
Start application
```
python app.py
```

To freeze requirements.txt
```
pip freeze > requirements.txt
```