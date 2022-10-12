const shortKeyboard = (tables) => {
    const inline_keyboard = []
    console.log(tables)
    for (let i = 0; i < tables.length; i++) {
        const {
            direction,
            departments,
            enterprises,
            topics,
            places,
            maxMembers,
            availableMembers
        } = tables[i]
        inline_keyboard.push([{
            text: direction,
            callback_data: tables[i]._id
        }])
    }
    inline_keyboard.push([{
        text: 'Назад',
        callback_data: 'Back'
    }])
    return inline_keyboard
        
    
}

module.exports = {
    shortKeyboard
}