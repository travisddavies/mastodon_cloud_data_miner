FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y build-essential python3-dev python3-pip wget
RUN pip install flask flask-restful Flask-Cors requests pandas CouchDB

COPY flaskProject /home/flaskProject

EXPOSE 5000
EXPOSE 8081

WORKDIR /home/flaskProject

CMD ["python3", "app.py"]