const fs = require('fs')

const mapFx = function (doc) {
  keywords_1 = [
    "globalwarming",
    "global warming",
    "climate",
    "earthday",
    "earth day",
    "pollution",
    "greenhousegases",
    "green house gases",
    "carbondioxide",
    "carbon dioxide",
    "co2",
    "fossilfuels",
    "fossil fuels",
    "renewableenergy",
    "renewable energy",
    "parisagreement",
    "paris agreement",
    "sealevelrise",
    "sea level rise",
    "extremeweather",
    "extreme weather",
    "sustainability",
    "cleanenergy",
    "clean energy",
    "carbonfootprint",
    "carbon footprint",
    "energyefficiency",
    "energy efficiency",
    "carboncaptureandstorage",
    "carbon capture and storage",
    "carbon capture",
    "biodiversity",
    "deforestation",
    "ipcc",
    "conferenceofparties",
    "conference of parties",
    "emissions",
    "net-zeroemissions",
    "carbonpricing",
    "carbon pricing",
  ]

  aus = ['australia', 'australian capital territory', 'new south wales', 'northern territory', 'queensland', 'south australia', 'tasmania', 'victoria', 'western australia']

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
  place_name = correctFormat(doc.place_name).split(", ")[1]

  if (aus.includes(place_name)) {
    for (keyword of keywords_1) {
      if (tags.includes(keyword) ||
        tokens.includes(keyword) ||
        domain_name.includes(keyword) ||
        description.includes(keyword) ||
        matching_rule_tag.includes(keyword) ||
        hashtags.includes(keyword)) {

        emit([doc.bbox, doc.place_name], [doc.sentiment, 1])

        break
      }

    }
  }

}

const views = {
  "views": {
    "climate_filter": {
      "map": mapFx.toString(),
      "reduce": "_sum"
    }
  }
}

fs.writeFileSync('view_s1.json', JSON.stringify(views))
