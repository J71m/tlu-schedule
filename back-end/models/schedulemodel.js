const request = require('request')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const https = require('https')

const url = 'https://www.tlu.ee/masio/?id=ryhm&ryhm=IFIFB-2#mASIO'

const getSchedule = url => {
    https.get(url, function(res) {
        var chunks = []
        res.on('data', function(chunk) {
            chunks.push(chunk)
        })
        res.on('end', function() {
            var decodedBody = iconv.decode(Buffer.concat(chunks), 'win1252')
            const $ = cheerio.load(decodedBody)
            const days = $('.dp div')
            days.each((i, element) => {
                if ($(element).hasClass("dayname")) {
                    const day = $(element).text()
                    console.log(day)
                } else if($(element).hasClass("lline")) {
                    const classTime = $(element).children().first()
                    const className = $(classTime).next().text()
                    const classProf = $(element).children('.small').text()
                    const classRoom = $(element).children().remove().end().text().replace(/\s\s+/g, '')
                    console.log(classRoom+ ' | ' +classTime.text()+ ' | ' +className+ ' | ' +classProf)
                    //console.log($(element).text().replace(/\s\s+/g, ''))
                }
            })
        })
    })
}

getSchedule(url)
