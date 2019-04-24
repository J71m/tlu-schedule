const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const https = require('https')

const url = 'https://www.tlu.ee/asio/kalenterit2/index.php?kt=lk&av=190422190428190424&guest=intranet%2Ftu&lang=est&jagu=4'

async function iterateGroups() {
    
}

const transformData = ($) => {
    const lines = $('.asio_basic_outer a')
    let groups = []
    return new Promise((resolve, reject) => {
        lines.each((i, element) => {
            groups.push(new Promise((set, error) => {
                set($(element).text())
            }))
        })
        console.log(groups)
        resolve(await Promise.all(groups))
    })
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
                transformData($).then(data => {
                    resolve(data)
                })
                    
            })
        })
            
    })
}
