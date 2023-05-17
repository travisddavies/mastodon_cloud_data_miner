FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y build-essential python3-dev python3-pip wget
RUN pip install CouchDB
RUN python -m pip install mpi4py

COPY twitter-huge.json.zip /home/twitter-huge.json.zip
COPY downsizing_couch.py /home/downsizing_couch.py
COPY au.json /home/au.json

RUN unzip /home/twitter-huge.json.zip

WORKDIR /home

RUN mpiexec -np 2 python3 downsizing_couch.py

EXPOSE 8081