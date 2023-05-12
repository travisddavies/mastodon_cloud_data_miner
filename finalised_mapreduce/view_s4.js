const fs = require('fs')

const mapFx = function (doc) {

  aus = ['australian capital territory', 'new south wales', 'northern territory', 'queensland', 'south australia', 'tasmania', 'victoria', 'western australia']

  place_name = (doc.place_name).toLowerCase().split(", ")

  if (place_name[1] != 'victoria') {
    victoria_city = null
  } else {
    victoria_city = place_name[0]
  }

  if (place_name[1] === 'australia') {
    place_name = place_name[0]
  } else {
    place_name = place_name[1]
  }

  bbox = doc.bbox

  if (place_name === 'australian capital territory') {
    bbox = [148.76267481475, -35.9207622144096, 149.399287194177, -35.1245172749714]
  }
  if (place_name === 'new south wales') {
    bbox = [140.999474522999, -37.5050599967256, 159.109219008, -28.1570199141289]
  }
  if (place_name === 'northern territory') {
    bbox = [129.00043972181, -25.9994823328982, 138.001197860428, -10.9659142638934]
  }
  if (place_name === 'queensland') {
    bbox = [137.99595743193, -29.1778977038344, 153.552171234046, -9.14217597872764]
  }
  if (place_name === 'south australia') {
    bbox = [129.001336997342, -38.0626029901026, 141.002955609625, -25.9961464965035]
  }
  if (place_name === 'tasmania') {
    bbox = [143.818922731609, -43.7405096002224, 148.498673596735, -39.2036616587427]
  }
  if (place_name === 'victoria') {
    bbox = [140.961681976682, -39.1591895298437, 149.976679007421, -33.9804255797424]
  }
  if (place_name === 'western australia') {
    bbox = [112.921113954128, -35.1348464327536, 129.00193001566, -13.6894920283571]
  }

  state = 1

  vic_no = 0

  text = doc.text.toLowerCase()

  asshole = ['anus', 'ash0le', 'ash0les', 'asholes', 'ass', 'assh0le', 'assh0lez', 'asshole', 'assholes', 'assholz', 'azzhole', 'butthole'].map(function (x) {
    return x.toLowerCase()
  })
  bitch = ['Biatch', 'bitch', 'bitches', 'b!+ch'].map(function (x) {
    return x.toLowerCase()
  })
  cock = ['c0ck', 'c0cks', 'c0k', 'cawk', 'cawks', 'cockhead', 'cock-head', 'cocks', 'CockSucker', 'cock-sucker', 'cock', 'dick', 'dyke'].map(function (x) {
    return x.toLowerCase()
  })
  cunt = ['Clit', 'cnts', 'cntz', 'cum', 'cunt', 'cunts', 'cuntz', 'kunt', 'kunts', 'kuntz'].map(function (x) {
    return x.toLowerCase()
  })
  fag = ['fag', 'fag1t', 'faget', 'fagg1t', 'faggit', 'faggot', 'fagit', 'fags', 'fagz', 'faig', 'faigs', 'g00k'].map(function (x) {
    return x.toLowerCase()
  })
  fuck = ['f u c k', 'f u c k e r', 'flipping the bird', 'fuck', 'fucker', 'fuckin', 'fucking', 'fucks', 'Fudge Packer', 'fuk', 'Fukah', 'Fuken', 'fuker', 'Fukin', 'Fukk', 'Fukkah', 'Fukken', 'Fukker', 'Fukkin'].map(function (x) {
    return x.toLowerCase()
  })
  shit = ['Sh!t', 'sh1t', 'sh1ter', 'sh1ts', 'sh1tter', 'sh1tz', 'shit', 'shits', 'shitter', 'Shitty', 'Shity', 'shitz', 'Shyt', 'Shyte', 'Shytty', 'Shyty'].map(function (x) {
    return x.toLowerCase()
  })

  regex_asshole = new RegExp("\\b(" + asshole.join("|") + ")\\b")
  regex_bitch = new RegExp("\\b(" + bitch.join("|") + ")\\b")
  regex_cock = new RegExp("\\b(" + cock.join("|") + ")\\b")
  regex_cunt = new RegExp("\\b(" + cunt.join("|") + ")\\b")
  regex_fag = new RegExp("\\b(" + fag.join("|") + ")\\b")
  regex_fuck = new RegExp("\\b(" + fuck.join("|") + ")\\b")
  regex_shit = new RegExp("\\b(" + shit.join("|") + ")\\b")

  if (vic_no === 1) {
    if (victoria_city != null) {
      place_name = victoria_city
      bbox = doc.bbox
    } else {
      place_name = null
    }
  }

  if (aus.includes(place_name) || (vic_no === 1 && victoria_city != null)) {
    if (text.match(regex_asshole) != null) {
      if (state === 1) {
        emit([bbox, place_name, 'asshole'], 1)
      } else {
        emit('asshole', 1)
      }
    }
    if (text.match(regex_bitch) != null) {
      if (state === 1) {
        emit([bbox, place_name, 'bitch'], 1)
      } else {
        emit('bitch', 1)
      }
    }
    if (text.match(regex_cock) != null) {
      if (state === 1) {
        emit([bbox, place_name, 'cock/dick'], 1)
      } else {
        emit('cock/dick', 1)
      }
    }
    if (text.match(regex_cunt) != null) {
      if (state === 1) {
        emit([bbox, place_name, 'cunt'], 1)
      } else {
        emit('cunt', 1)
      }
    }
    if (text.match(regex_fag) != null) {
      if (state === 1) {
        emit([bbox, place_name, 'faggot'], 1)
      } else {
        emit('faggot', 1)
      }
    }
    if (text.match(regex_fuck) != null) {
      if (state === 1) {
        emit([bbox, place_name, 'fuck'], 1)
      } else {
        emit('fuck', 1)
      }
    }
    if (text.match(regex_shit) != null) {
      if (state === 1) {
        emit([bbox, place_name, 'shit'], 1)
      } else {
        emit('shit', 1)
      }
    }
  }

}

const views = {
  "views": {
    "state_wise": {
      "map": mapFx.toString(),
      "reduce": '_sum'
    },
    "total": {
      "map": mapFx.toString().replace('state = 1', 'state = 0'),
      "reduce": '_sum'
    },
    "victoria_filter": {
      "map": mapFx.toString().replace('vic_no = 0', 'vic_no = 1'),
      "reduce": '_sum'
    }
  }
}

fs.writeFileSync('view_swear.json', JSON.stringify(views))
