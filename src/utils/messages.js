const generateMessage = (username, text) => ({
    username,
    text,
    createdAt: new Date().getTime()
});

const generateLocationMessage = (username, locationObject) => ({
    username,
    url: `https://google.com/maps?q=${locationObject.lat},${locationObject.long}`,
    createdAt: new Date().getTime()
})

module.exports = { generateMessage, generateLocationMessage }