const request = require('request')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const https = require('https')

const getDayFromString = dayString => {
    weekValuePairs = {
        "Esmaspäev": 0,
        "Teisipäev": 1,
        "Kolmapäev": 2,
        "Neljapäev": 3,
        "Reede": 4,
        "Laupäev": 5,
        "Pühapäev": 6
    }
    const day = dayString.split(' ')[0]
    return weekValuePairs[day]
}

Date.prototype.getWeekNumber = function(){
    var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};

const transformData = (groupName, $) => {
    const currentDate = new Date()
    let scheduleresponse = {
        "year": currentDate.getFullYear(),
        "week": currentDate.getWeekNumber(),
        "group": groupName,
        "classes": [[],[],[],[],[],[],[]]
    }
    const lines = $('.dp div')
    let day = []
    let dayIndex = 0
    return new Promise((resolve, reject) => {
        let classObject = {}
        lines.each((i, element) => {
            if ($(element).hasClass("dayname")) {
                dayIndex = getDayFromString($(element).text())
                day = []
            } else if($(element).hasClass("lline")) {
                const classTime = $(element).children().first()
                const className = $(classTime).next().text()
                const classProf = $(element).children('.small').text()
                const classRoom = $(element).children().remove().end().text().replace(/\s\s+/g, '')
                classObject = {}
                const time = classTime.text().split('-')
                classObject.startTime = time[0]
                classObject.endTime = time[1]
                classObject.name = className
                classObject.lecturer = classProf
                classObject.room = classRoom
                day.push(classObject)
                scheduleresponse.classes[dayIndex] = day
            }
        })
        
        resolve(scheduleresponse)
    })
}

module.exports = class Schedule {
    constructor(groupName='IFIFB-2', scheduleTime=Math.floor(new Date() / 1000)) {
        this.groupName = groupName
        this.scheduleTime = scheduleTime
        this.url = `https://www.tlu.ee/masio/?id=ryhm&ryhm=${this.groupName}&time=${this.scheduleTime}#mASIO`
    }

    getSchedule () {
        const group = this.groupName
        return new Promise((resolve, reject) => {
            https.get(this.url, function(res) {
                var chunks = []
                res.on('data', function(chunk) {
                    chunks.push(chunk)
                })
                res.on('end', function() {
                    var decodedBody = iconv.decode(Buffer.concat(chunks), 'win1252')
                    const $ = cheerio.load(decodedBody)
                    transformData(group, $).then(data => {
                        resolve(data)
                    })
                        
                })
            })
                
        })
    
        
        
    }
}
