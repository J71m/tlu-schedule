const request = require('request')
const cheerio = require('cheerio')

async function getHTML(url) {
    const { data: html } = await axios.get(url);
    return html;
}

async function getWeekSchedule(html) {
    // load up cheerio
    const $ = cheerio.load(html);
    const span = $('.glayout')
    $('.dayname').each( (i, e) => { //for every day, [0] == monday
        //console.log($(this).text())
        console.log($(e).text())
    })
    //console.log(span)
    //return span.data('count');
}

const tluinf = 'http://www.tlu.ee/masio/?id=ryhm&ryhm=IFIFB-2#mASIO'
let fullhtml = getHTML(tluinf).then(htmltext => {
    getWeekSchedule(htmltext)
})

const oneWeekData = // oneWeekData.classes[0][0].name === "boring lesson"
{
    "year": 2019,
    "week": 14,
    "group": "IFIFB-2",
    "classes": [
        [ // monday
            {
                "name": "boring lesson",
                "lecturer": "mr boring",
                "room": "A404",
                "startTime": "10:15",
                "endTime": "13:45",

            },
            {
                "name": "boring lesson2",
                "lecturer": "mr boring2",
                "room": "A406",
                "startTime": "14:15",
                "endTime": "15:45",

            }
        ],
        [ // tuesday

        ],
        [ // wednesday
            {
                "name": "boring lesson",
                "lecturer": "mr boring",
                "room": "A404",
                "startTime": "10:15",
                "endTime": "13:45",

            },
            {
                "name": "boring lesson2",
                "lecturer": "mr boring2",
                "room": "A406",
                "startTime": "14:15",
                "endTime": "15:45",

            }
        ]
    ]
}

//console.log(oneWeekData.classes[2][0].name)