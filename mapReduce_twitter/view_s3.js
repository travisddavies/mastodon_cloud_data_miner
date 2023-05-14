const fs = require('fs')

const mapFx = function (doc) {

  coffee_a = [
    'coffee',
    'espresso',
    'latte',
    'cappuccino',
    'mocha',
    'americano',
    'cold brew',
    'macchiato',
    'affogato',
    'doppio',
    'ristretto',
    'lungo',
    'flat white',
    'long black',
    'short black',
    'nespresso'
  ]
  coffee_1 = [...new Set(coffee_a.concat(coffee_a.map(x => x.replace(' ', ''))))]

  keywords = coffee_1

  state = doc.place_name['state']
  city_town = doc.place_name['city']

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

  if (state == 'victoria' && city_town != null) {
    for (keyword of keywords) {
      if (tags.includes(keyword) ||
        tokens.includes(keyword) ||
        domain_name.includes(keyword) ||
        description.includes(keyword) ||
        matching_rule_tag.includes(keyword) ||
        hashtags.includes(keyword)) {

        emit(city_town, 1)

        break
      }
    }
  }

}

const views = {
  "views": {
    "coffee_filter": {
      "map": mapFx.toString(),
      "reduce": '_sum'
    }
  }
}

fs.writeFileSync('view_s3.json', JSON.stringify(views))
