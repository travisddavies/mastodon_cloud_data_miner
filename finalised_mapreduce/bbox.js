const fs = require('fs')

const mapFx = function (doc) {

  aus = ['australian capital territory', 'new south wales', 'northern territory', 'queensland', 'south australia', 'tasmania', 'victoria', 'western australia']

  place_name = (doc.place_name).toLowerCase().split(", ")

  if (place_name[1] === 'australia') {
    place_name = place_name[0]
  } else {
    place_name = place_name[1]
  }

  if (aus.includes(place_name)) {
    emit(place_name, [doc.bbox[0], doc.bbox[1], doc.bbox[2], doc.bbox[3], 1])
  }

}

const reduceFx = function (keys, values, rereduce) {
  // min LON ,min LAT, max LON, max LAT
  results = [null, null, null, null, 0]

  if (rereduce) {
    for (var i = 0; i < values.length; i++) {
      if (results[0] === null || values[i][0] < results[0]) {
        results[0] = values[i][0]
      }
      if (results[1] === null || values[i][1] < results[1]) {
        results[1] = values[i][1]
      }
      if (results[2] === null || values[i][2] > results[2]) {
        results[2] = values[i][2]
      }
      if (results[3] === null || values[i][3] > results[3]) {
        results[3] = values[i][3]
      }
      results[4] += values[i][4]
    }
    return results
  } else {
    for (var j = 0; j < values.length; j++) {
      if (results[0] === null || values[j][0] < results[0]) {
        results[0] = values[j][0]
      }
      if (results[1] === null || values[j][1] < results[1]) {
        results[1] = values[j][1]
      }
      if (results[2] === null || values[j][2] > results[2]) {
        results[2] = values[j][2]
      }
      if (results[3] === null || values[j][3] > results[3]) {
        results[3] = values[j][3]
      }
      results[4] = values.length
    }
    return results
  }
}

const views = {
  "views": {
    "state_bbox": {
      "map": mapFx.toString(),
      "reduce": reduceFx.toString()
    }
  }
}

fs.writeFileSync('view_state.json', JSON.stringify(views))
