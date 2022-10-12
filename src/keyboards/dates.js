const dates = ['14 Октября',
    '15 Октября',
    '16 Октября',
    '17 Октября',
    '18 Октября ']
const datesKeyboard = [
        [
            {
                text: dates[0],
                callback_data: '14'
            },
            {
                text: dates[1],
                callback_data: '15'
            }
        ],
        [
            {
                text: dates[2],
                callback_data: '16'
            },
            {
                text: dates[3],

                callback_data: '17'
            }
        ],
        [
            {
                text: dates[4],
                callback_data: '18'
            }
        ],
        [
            {
                text: 'Вернуться в главное меню',
                callback_data: 'Back'
            }
        ]
    ]

module.exports = datesKeyboard