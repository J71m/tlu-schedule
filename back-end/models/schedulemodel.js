const request = require('request')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')

const url = 'http://www.tlu.ee/masio/?id=ryhm&ryhm=IFIFB-2#mASIO'

const getSchedule = url => {
    request(url, (error, res, html) => {
        if(!error && res.statusCode == 200) {
            const $ = cheerio.load(iconv.decode(html, 'ISO-8859-16'))
            //const days = $('#mASIO .dayname')
            const days = $('.dp div')
            days.each((i, element) => {
                if ($(element).hasClass("dayname")) {
                    console.log($(element).text())
                }
                
                /*
                $(element).each((lessonIterator, lessonEl) => {
                    const lesson = $(lessonEl).text()
                    //console.log(lesson)
                })
                const day = $(element).next().text()
                //console.log(i, day)
                */
            })
        }
    })
}

getSchedule(url)
