Run the docker with volume
docker run -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=password -p 5984:5984 -v F:\UOM\assignment\2023S1\COMP90024\ASM2\ass2-couchdb\mountCouchData:/opt/couchdb/data -d couchdb

check couchdb of vm in localhost
ssh -i key.pem -L 8888:localhost:5984 ubuntu@172.26.132.82