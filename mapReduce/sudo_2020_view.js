const fs = require('fs')

const mapFx = function (doc) {
    // male = doc.males_num
    // female = doc.females_num
    new_LGA_name_2020 = doc.LGA_name_2020.replace(/ *\([^)]*\) */g, "").toLowerCase().trim()
    new_state_name = doc.State_name_2016.replace(/ *\([^)]*\) */g, "").toLowerCase().trim()
    emit([new_LGA_name_2020, doc.LGA_code_2020, new_state_name], [doc.Males,doc.Females])
}

const views = {
  "views": {
    "sudo_MF_lga_filter": {
      "map": mapFx.toString(),
      "reduce": "_sum"
    }
  }
}

fs.writeFileSync('sudo_2020_view.json', JSON.stringify(views))