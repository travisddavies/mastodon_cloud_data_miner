const fs = require('fs')

const mapFx = function (doc) {

  climate_a =
    ['climate',
      'pollution',
      'co2',
      'sustainability',
      'carbonfootprint',
      'deforestation',
      'ipcc',
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

  tesla_a = ['tesla', 'electric vehicles', 'evs', 'cybertruck', 'model s', 'model 3', 'model x', 'model y']
  tesla_1 = [...new Set(tesla_a.concat(tesla_a.map(x => x.replace(' ', ''))))]

  pick_key = 'climate'

  if (pick_key === 'climate') {
    keywords = climate_1
  } else if (pick_key === 'tesla') {
    keywords = tesla_1
  }

  state = doc.place_name['state']

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


  for (keyword of keywords) {
    if (tags.includes(keyword) ||
      tokens.includes(keyword) ||
      domain_name.includes(keyword) ||
      description.includes(keyword) ||
      matching_rule_tag.includes(keyword) ||
      hashtags.includes(keyword)) {

      emit(state, 1)

      break
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
