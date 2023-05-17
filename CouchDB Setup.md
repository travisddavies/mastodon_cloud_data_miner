# CouchDB Set up
Install Docker

Install CouchDB image in Docker

Set up single node in CouchDB, instance 1,2,3

Set up groups for instance 1,2,3 to save duplicated data in case the server is down

# Ansible Set up
Virtual machine from virtual box set up for trial: if ansible script is proper in virtual machine

# set up security group for every folder
sudo chgrp ubuntu /directory/path

sudo chown ubuntu /directory/path

# check couchdb from local
ssh -i key.pem -L 8888:localhost:5984 ubuntu@172.26.132.82


# create docker image
sudo docker build -t image-name .
sudo docker run -d image-name

# check ansible script of mastodon-client
