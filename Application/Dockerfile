# init a base image
FROM python:3.9-slim

# upgrade pip
RUN pip install --upgrade pip
# upgrade apt-get
RUN apt-get upgrade

# define working directory and install dependencies
COPY requirements.txt /Application/requirements.txt
WORKDIR /Application
RUN pip install -r requirements.txt

# copy the content into the working dir
COPY . /Application/
# use apt-get to get update
# RUN apt-get -y update

# define the command to start the container
CMD [ "python", "app.py" ]