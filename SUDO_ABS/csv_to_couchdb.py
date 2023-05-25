import couchdb
import csv
import os

# abs_folder = os.listdir('/home/ubuntu/data/ABS Data by Region/csv/')

couch = couchdb.Server('http://admin:password@localhost:5984/')

# create DB for ABS Data and Save it
abs_folder = os.listdir('/ABS Data by Region/csv/')
dbname = 'abs'
if dbname in couch:
    db = couch[dbname]
# else:
#     db = couch.create(dbname)

abs_data = []
for filename in abs_folder:
    location = filename.split('.')[0].lower()
    path = '/ABS Data by Region/csv/' + filename
    with open(path, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # print(row)
            for key, value in row.items():
                try:
                    row[key] = float(value)
                except ValueError:
                    pass  # Ignore non-float values
            new_row = {key.replace(' ', '_'): value for key, value in row.items()}
            new_row['location'] =location
            abs_data.append(new_row)
            # db.save(row)
db.update(abs_data)

# create DB for SUDO Data 2019 and Save it
dbname_1 = 'sudo_summary_2019'
if dbname_1 in couch:
    db = couch[dbname_1]
# else:
#     db = couch.create(dbname_1)

sudo_data_2019 = []
with open('/SUDO/abs_regional_population_summary_lga_2019-9179848315534025398.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # print(row)
            for key, value in row.items():
                try:
                    row[key] = float(value)
                except ValueError:
                    pass  # Ignore non-float values
            new_row = {key.replace(' ', ''): value for key, value in row.items()}
            # print(new_row)
            sudo_data_2019.append(new_row)
            # db.save(row)
db.update(sudo_data_2019)

# create DB for SUDO Data 2020 and Save it
dbname_2 = 'sudo_population_2020'
if dbname_2 in couch:
    db = couch[dbname_2]
# else:
#     db = couch.create(dbname_2)

sudo_data_2020 = []
with open('/SUDO/abs_regional_population_age_sex_lga_2020-5503376266325126961.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # print(row)
            for key, value in row.items():
                try:
                    row[key] = float(value)
                except ValueError:
                    pass  # Ignore non-float values
            new_row = {key.replace(' ', ''): value for key, value in row.items()}
            sudo_data_2020.append(new_row)
            # db.save(row)
db.update(sudo_data_2020)

dbname_3 = 'sudo_median_2021'
if dbname_3 in couch:
    db = couch[dbname_3]
# else:
#     db = couch.create(dbname_3)

with open('/SUDO/georef-australia-local-government-area.json') as lga_file:
    lga = json.load(lga_file)

sudo_median_2021 = []
with open('/SUDO/abs_2021census_g02_aust_lga-52281858879944452.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        new_row = {key.replace(' ', ''): value for key, value in row.items()}
        modified_row = {}
        for key, value in new_row.items():
            try:
                modified_row[key] = float(value)
            except ValueError:
                modified_row[key] = value  # Assign the original value for non-float values
            if key == "lga_code_2021":
                lga_state_code = str(new_row[key])[0]
                if lga_state_code == '1':
                    modified_row["state_name"] = "New South Wales"
                elif lga_state_code == '2':
                    modified_row["state_name"] = "Victoria"
                elif lga_state_code == '3':
                    modified_row["state_name"] = "Queensland"
                elif lga_state_code == '4':
                    modified_row["state_name"] = "South Australia"
                elif lga_state_code == '5':
                    modified_row["state_name"] = "Western Australia"
                elif lga_state_code == '6':
                    modified_row["state_name"] = "Tasmania"
                elif lga_state_code == '7':
                    modified_row["state_name"] = "Northern Territory"
                elif lga_state_code == '8':
                    modified_row["state_name"] = "Australian Capital Territory"
                elif lga_state_code == '9':
                    modified_row["state_name"] = "Northern Territory"

                lga_code = str(new_row[key])
                for element in lga:
                    if element["lga_code"][0] == lga_code:
                        modified_row["lga_name"] = element["lga_name"][0]

        sudo_median_2021.append(modified_row)
db.update(sudo_median_2021)



dbname_4 ='sudo_environment_2018'
if dbname_4 in couch:
    db = couch[dbname_4]
# else:
#     db = couch.create(dbname_4)

sudo_environment_2018 = []
with open('/SUDO/abs_data_by_region_land_and_environment_lga_2014_2018-1579945311216356256.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        new_row = {key.replace(' ', ''): value for key, value in row.items()}
        modified_row = {}
        for key, value in new_row.items():
            try:
                modified_row[key] = float(value)
            except ValueError:
                modified_row[key] = value  # Assign the original value for non-float values
            if key == "lga_code_2019":
                lga_state_code = str(new_row[key])[0]
                if lga_state_code == '1':
                    modified_row["state_name"] = "New South Wales"
                elif lga_state_code == '2':
                    modified_row["state_name"] = "Victoria"
                elif lga_state_code == '3':
                    modified_row["state_name"] = "Queensland"
                elif lga_state_code == '4':
                    modified_row["state_name"] = "South Australia"
                elif lga_state_code == '5':
                    modified_row["state_name"] = "Western Australia"
                elif lga_state_code == '6':
                    modified_row["state_name"] = "Tasmania"
                elif lga_state_code == '7':
                    modified_row["state_name"] = "Northern Territory"
                elif lga_state_code == '8':
                    modified_row["state_name"] = "Australian Capital Territory"
                elif lga_state_code == '9':
                    modified_row["state_name"] = "Northern Territory"

        sudo_environment_2018.append(modified_row)
        # db.save(modified_row)
db.update(sudo_environment_2018)