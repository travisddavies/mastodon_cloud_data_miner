const fs = require('fs')

const mapFx = function (doc) {
  state = doc.place_name['state']
  emit(state, 1)
}

const views = {
  "views": {
    "state_tweets": {
      "map": mapFx.toString(),
      "reduce": "_sum"
    }
  }
}

fs.writeFileSync('view_state.json', JSON.stringify(views))
