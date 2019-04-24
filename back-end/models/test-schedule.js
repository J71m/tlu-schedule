exports.oneWeekData =
{
    "time": 1555494500,
    "group": "IFIFB-2",
    "classes": [
        [   // monday
            {
                "name": "boring lesson",
                "lecturer": "mr boring",
                "room": "A404",
                "startTime": "10:15",
                "endTime": "13:45"

            },
            {
                "name": "boring lesson2",
                "lecturer": "mr boring2",
                "room": "A406",
                "startTime": "14:15",
                "endTime": "15:45"

            }
        ],
        [], // tuesday
        [   // wednesday
            {
                "name": "boring lesson",
                "lecturer": "mr boring",
                "room": "A404",
                "startTime": "10:15",
                "endTime": "13:45"

            },
            {
                "name": "boring lesson2",
                "lecturer": "mr boring2",
                "room": "A406",
                "startTime": "14:15",
                "endTime": "15:45"

            }
        ],
        [], // thursday
        [   // friday
            {
                "name": "boring lesson2",
                "lecturer": "mr boring2",
                "room": "A406",
                "startTime": "14:15",
                "endTime": "15:45"
            }
        ],
        [],
        []
    ]
}
//                                   monday=0, tuesday=1, ..., friday=4
//                                   |
//                                   |  first lesson=0
//                                   |  |
//   console.log(oneWeekData.classes[2][0].name)   // name of first lesson on wednesday