const fs = require('fs')

const mapFx = function (doc) {
    state_name = doc.state_name
    if (state_name == "Victoria"){
        new_lga_name = doc.lga_name.replace(/ *\([^)]*\) */g, "").toLowerCase().trim()
        new_state_name = doc.state_name.replace(/ *\([^)]*\) */g, "").toLowerCase().trim()
        emit([new_lga_name, doc.lga_code_2021, new_state_name], [doc.median_age_persons,doc.median_tot_prsnl_inc_weekly])
    }

    
}

const views = {
  "views": {
    "sudo_vic_median_filter": {
      "map": mapFx.toString(),
    //   "reduce": "_sum"
    }
  }
}

fs.writeFileSync('sudo_2021_median_view.json', JSON.stringify(views))