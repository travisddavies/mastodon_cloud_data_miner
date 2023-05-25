const fs = require('fs')

const mapFx = function (doc) {
    // male = doc.males_num
    // female = doc.females_num
    new_state_name = doc.state_name.replace(/ *\([^)]*\) */g, "").toLowerCase().trim()
    emit([new_state_name], [doc.males_num,doc.females_num])
}

const views = {
  "views": {
    "sudo_filter": {
      "map": mapFx.toString(),
      "reduce": "_sum"
    }
  }
}

fs.writeFileSync('sudo_2019_view.json', JSON.stringify(views))