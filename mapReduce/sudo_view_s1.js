const fs = require('fs')

const mapFx = function (doc) {
    // male = doc.males_num
    // female = doc.females_num
    emit([doc.state_name], [doc.males_num,doc.females_num])
}

const views = {
  "views": {
    "sudo_filter": {
      "map": mapFx.toString(),
      "reduce": "_sum"
    }
  }
}

fs.writeFileSync('sudo_view_s1.json', JSON.stringify(views))