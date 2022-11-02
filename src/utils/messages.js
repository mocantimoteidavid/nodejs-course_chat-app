const generateMessage = (text) => ({
    text,
    createdAt: new Date().getTime()
});

const generateLocationMessage = (locationObject) => ({
    url: `https://google.com/maps?q=${locationObject.lat},${locationObject.long}`,
    createdAt: new Date().getTime()
})

module.exports = { generateMessage, generateLocationMessage }