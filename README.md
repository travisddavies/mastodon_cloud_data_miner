# COMP90024 Cluster and Cloud Computing - Assignment 2
## User Guide
To deploy the cloud instances, find the deployment directory and execute the following command:

``
    .\run-mrc.sh
``

This will develop all 4 cloud instances with the provided features such as volume, security groups and images. In the hosts.ini folder, all IP addresses can be found in the hosts.ini file, these are set out as a configuration node, sender nodes and an app node. What's more, the username and private key variables can also be found in the hosts.ini file. All public keys used for authorisation on the instances can also be found in the public keys directory.

In the app directory, a collection of front end, back end and reverse proxy images can be found, which will be run on the app node. The mastodon file contains the images for a single mastodon client which harvests all toots and a scaled mastodon client where each client harvests different topics. Outside of the deployment directory, you can find all data processing files used on the cloud.

To configure everything for set up on the cloud, execute the following command:

``
    ansible-playbook main.yaml
``

This command will mount the volumes, authorise all public keys, synchronise time among instances, fix permissions on working directories, install necessary software, and set up all docker containers on the instances for you. These containers include services such as a cluster database, clustered mastodon harvesters and synchronised applications with traffic being managed by a reverse proxy. All databases and MapReduce functions will be set, but data processing will not be automatically set up. Once this procedure is complete, you can visit the IP address 172.26.135.191 on your internet browser. You should now be able to see a website dashboard showing a collection of tweets and toots for the selected topics of research.
