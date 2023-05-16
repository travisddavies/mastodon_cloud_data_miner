const fs = require('fs')

const mapFx = function (doc) {

  state = doc.place_name['state']
  city_town = doc.place_name['city']

  if (state == 'victoria' && city_town != null) {
    {
      emit(city_town, 1)
    }
  }

}

const views = {
  "views": {
    "city_filter": {
      "map": mapFx.toString(),
      "reduce": '_sum'
    }
  }
}

fs.writeFileSync('victoria_tweets_count.json', JSON.stringify(views))
