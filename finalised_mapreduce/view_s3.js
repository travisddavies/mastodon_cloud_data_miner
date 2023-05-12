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

  place_name = (doc.place_name).toLowerCase().split(", ")

  if (place_name[1] != 'victoria') {
    place_name = null
  } else {
    place_name = place_name[0]
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

  if (place_name != null) {
    for (keyword of keywords) {
      if (tags.includes(keyword) ||
        tokens.includes(keyword) ||
        domain_name.includes(keyword) ||
        description.includes(keyword) ||
        matching_rule_tag.includes(keyword) ||
        hashtags.includes(keyword)) {

        emit([doc.bbox, place_name], 1)

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
