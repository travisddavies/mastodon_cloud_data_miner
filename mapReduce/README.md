We write the MapReduce functions in JavaScript first, then turn into a string and produce a view in the correct JSON format.

Thus, to see the details of MapReduce functions of our SUDO data, please look at:
- sudo_2019_view.js for SUDO ABS - Regional Population - Summary Statistics (LGA) 2019 
- sudo_2020_view.js for SUDO ABS - Regional Population - Population Estimates by Age and Sex (LGA) 2020
- sudo_2021_median_view.js for SUDO Selected Medians and Averages
- sudo_environment_view.js for SUDO ABS - Data by Region - Land & Environment (LGA) 2014-2018

The design documents (JSON file) will be produced by running the above java script by for example 'node view_s1.js'. The corresponding design document will be produced:

- sudo_2019_view.json for SUDO ABS - Regional Population - Summary Statistics (LGA) 2019 
- sudo_2020_view.json for SUDO ABS - Regional Population - Population Estimates by Age and Sex (LGA) 2020
- sudo_2021_median_view.json for SUDO Selected Medians and Averages
- sudo_environment_view.json for SUDO ABS - Data by Region - Land & Environment (LGA) 2014-2018

These are the documents that will be uploaded to CouchDB databases via PUT.
