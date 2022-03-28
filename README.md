# Project-Smoothies

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