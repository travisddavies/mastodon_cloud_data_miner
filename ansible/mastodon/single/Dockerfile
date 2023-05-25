# Use an official alpine runtime as the base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

COPY . /app
RUN pip install -r requirements.txt

EXPOSE 8000
ENTRYPOINT [ "python", "mastodon-couchdb.py", "runserver" ]