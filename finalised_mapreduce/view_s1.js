const fs = require('fs')

const mapFx = function (doc) {

  climate_a =
    ['climate',
      'pollution',
      'co2',
      'sustainability',
      'carbonfootprint',
      'deforestation', 'ipcc',
      'emissions',
      'global warming',
      'earth day',
      'green house gases',
      'carbon dioxide',
      'fossil fuels',
      'renewable energy',
      'paris agreement',
      'sea level rise',
      'extreme weather',
      'clean energy',
      'carbon footprint',
      'energy efficiency',
      'carbon capture and storage',
      'conference of parties',
      'net-zero emissions',
      'carbon pricing'
    ]
  climate_1 = [...new Set(climate_a.concat(climate_a.map(x => x.replace(' ', ''))))]

  tesla_a = ['tesla', 'electric vehicles', 'evs', 'cybertruck', 'model S', 'model 3', 'model X', 'model Y']
  tesla_1 = [...new Set(tesla_a.concat(tesla_a.map(x => x.replace(' ', ''))))]

  pick_key = 'climate'

  if (pick_key === 'climate') {
    keywords = climate_1
  } else if (pick_key === 'tesla') {
    keywords = tesla_1
  }

  aus = ['australian capital territory', 'new south wales', 'northern territory', 'queensland', 'south australia', 'tasmania', 'victoria', 'western australia']

  place_name = (doc.place_name).toLowerCase().split(", ")

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

  function correctFormat (input) {
    if (Array.isArray(input)) {
      if (input.length === 0) {
        return "Null"
      } else {
        return input.join(",").toLowerCase()
      }
    }
    if (input === null) {
      return "Null"
    }
    return input.toLowerCase()
  }

  tags = correctFormat(doc.tags)
  tokens = correctFormat(doc.tokens).replace("|", " ")
  domain_name = correctFormat(doc.domain_name)
  description = correctFormat(doc.description)
  matching_rule_tag = correctFormat(doc.matching_rule_tag)
  hashtags = correctFormat(doc.hashtags)

  if (aus.includes(place_name)) {
    for (keyword of keywords) {
      if (tags.includes(keyword) ||
        tokens.includes(keyword) ||
        domain_name.includes(keyword) ||
        description.includes(keyword) ||
        matching_rule_tag.includes(keyword) ||
        hashtags.includes(keyword)) {

        emit([bbox, place_name], 1)

        break
      }
    }
  }

}

const views = {
  "views": {
    "climate_filter": {
      "map": mapFx.toString(),
      "reduce": '_sum'
    },
    "tesla_filter": {
      "map": mapFx.toString().replace("pick_key = 'climate'", "pick_key = 'tesla'"),
      "reduce": '_sum'
    }
  }
}

fs.writeFileSync('view_s1.json', JSON.stringify(views))
