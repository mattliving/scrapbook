var cheerio = require('cheerio')
var rp = require('request-promise')
var when = require('when')
var pipeline = require('when/pipeline')

var endpoint = 'https://www.airbnb.co.uk/s/' + [
  'Kyoto--Japan',
  '?checkin=13-11-2015&checkout=14-11-2015',
  '&room_types[]=Entire+home/apt&room_types[]=Private+room',
  '&price_min=13&price_max=87',
  '&ib=true&ss_id=gcop68ot'
].join('')

// Export For Lambda Handler
module.exports.run = function (event, context) {
  return action(endpoint, {})
}

function action (endpoint, constraints) {
  return pipeline([
    requestHtml,
    parseHtml
  ], endpoint, constraints)
}

function requestHtml (endpoint, constraints) {
  return rp.get({
    uri: endpoint,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36'
    }
  }).then(function (html) {
    return {html: html, constraints: constraints}
  }).catch(function (e) {
    throw e
  })
}

function parseHtml (options) {
  var $ = cheerio.load(options.html)
  return({
    bodyLength: $('body').length
  })
}