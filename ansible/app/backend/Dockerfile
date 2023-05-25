FROM python:latest

RUN pip install flask flask-restful Flask-Cors requests pandas CouchDB

COPY flaskProject /home/flaskProject

EXPOSE 5000

WORKDIR /home/flaskProject

CMD ["python3", "app.py"]