const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const https = require('https')

const url = 'https://www.tlu.ee/asio/kalenterit2/index.php?kt=lk&av=190422190428190424&guest=intranet%2Ftu&lang=est&jagu=4'

const transformData = $ => {
    const lines = $('.asio_basic_outer small')
    let groups = []
    lines.each((i, element) => {
        let group = {
            "name": $(element).children('a').text(),
            "id": $(element).children('input').attr('value')
        }
        console.log(group)
        groups.push(group)
    })
    return groups
}

exports.getGroups = () => {
    return new Promise((resolve, reject) => {
        https.get(url, function(res) {
            var chunks = []
            res.on('data', function(chunk) {
                chunks.push(chunk)
            })
            res.on('end', function() {
                var decodedBody = iconv.decode(Buffer.concat(chunks), 'win1252')
                const $ = cheerio.load(decodedBody)
                resolve(transformData($))
                
                    
            })
        })
            
    })
}