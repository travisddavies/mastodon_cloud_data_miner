import couchdb
import csv
import os

abs_folder = os.listdir('/home/ubuntu/data/ABS Data by Region/csv/')

couch = couchdb.Server('http://admin:password@172.26.132.147:5984')

# create DB for ABS Data and Save it
dbname = 'abs'
if dbname in couch:
    db = couch[dbname]
else:
    db = couch.create(dbname)

abs_data = []
for filename in abs_folder:
    location = filename.split('.')[0].lower()
    path = '/home/ubuntu/data/ABS Data by Region/csv/' + filename
    with open(path, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # print(row)
            row['location'] =location
            abs_data.append(row)
            # db.save(row)
db.update(abs_data)

# create DB for SUDO Data 2019 and Save it
dbname_1 = 'sudo_summary_2019'
if dbname_1 in couch:
    db = couch[dbname_1]
else:
    db = couch.create(dbname_1)

sudo_data_2019 = []
with open('/home/ubuntu/data/SUDO/abs_regional_population_summary_lga_2019-9179848315534025398.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # print(row)
            sudo_data_2019.append(row)
            # db.save(row)
db.update(sudo_data_2019)

# create DB for SUDO Data 2020 and Save it
dbname_2 = 'sudo_population_2020'
if dbname_2 in couch:
    db = couch[dbname_2]
else:
    db = couch.create(dbname_2)

sudo_data_2020 = []
with open('/home/ubuntu/data/SUDO/abs_regional_population_age_sex_lga_2020-5503376266325126961.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # print(row)
            sudo_data_2020.append(row)
            # db.save(row)
db.update(sudo_data_2020)


