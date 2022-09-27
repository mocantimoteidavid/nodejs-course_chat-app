const socket = io();

socket.on("messageFromServer", (message) => {
    console.log(message);
});

document.getElementById("chatForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const messageInput = e.target.elements.message;
    const submittedMessage = messageInput.value;
    messageInput.value = "";
    
    socket.emit("messageFromClient", submittedMessage, (error) => {
        if (error) {
            return console.error(error);
        }

        console.log("The message was delivered!");
    });
})

document.getElementById("shareLocation").addEventListener("click", () => {
    if (!navigator.geolocation) {
        return alert("Your browser doesn't support geolocation.");
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("locationFromClient", { lat: position.coords.latitude, long: position.coords.longitude }, () => {
            console.log("Location sheared!");
        })
    })
})