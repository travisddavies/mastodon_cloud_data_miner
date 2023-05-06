const fs = require('fs')

const mapReduce = function (tweet) {

  const keywords_1 = [
    "brexit",
    "marriage"]

  doc = tweet.doc

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

  if (doc._id) {
    for (const keyword of keywords_1) {

      tags = correctFormat(doc.tags)
      tokens = correctFormat(doc.tokens)
      domain_name = correctFormat(doc.domain_name)
      description = correctFormat(doc.description)
      text = correctFormat(doc.text)
      matching_rule_tag = correctFormat(doc.matching_rule_tag)
      hashtags = correctFormat(doc.hashtags)

      if (tags.includes(keyword) ||
        tokens.includes(keyword) ||
        domain_name.includes(keyword) ||
        description.includes(keyword) ||
        text.includes(keyword) ||
        matching_rule_tag.includes(keyword) ||
        hashtags.includes(keyword)) {

        emit({
          location: doc.place_name,
          sentiment: doc.sentiment,
          tokens: doc.tokens,
          tags: doc.tags,
          hashtags: doc.hashtags,
          tokens: doc.tokens,
          domain_name: doc.domain_name,
          description: doc.description,
          text: doc.text,
          matching_rule_tags: doc.matching_rule_tag,
          date: created_at
        })
        break
      }
    }
  }
}

const mapReduce_string = mapReduce.toString()

const views = {
  "views": {
    "my_filter": {
      "map": mapReduce_string
    }
  }
}

console.log(views)
fs.writeFileSync('view_s1.json', JSON.stringify(views))
