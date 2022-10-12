const dates = ['14 Октября',
    '15 Октября',
    '16 Октября',
    '17 Октября',
    '18 Октября ']
const eventDates = {
    'round': ['17 октября'],
    'masters': ['16 октября'],
    'excursions': ['16 октября'],
    'programs': ['16 октября','17 октября']
}
const datesKeyboardArray = []
const datesKeyboard = (type) => {
    let dates = []
    switch(type){
        case 'round':
            dates = eventDates.round
            break   
        case 'masters':
            dates = eventDates.masters
            break  
        case 'excursions':
            dates = eventDates.excursions
            break  
        case 'programs':
            dates = eventDates.programs
            break  
    }
    for(let i = 0; i < dates.length; i++ ){
        datesKeyboardArray.push([{'text': dates[i], callback_data: dates[i].split(' ')[0]}])
    }
    datesKeyboardArray.push([{
        text: 'Назад',
        callback_data: 'Back'
    }])
    return datesKeyboardArray
}

module.exports = datesKeyboard