const socket = io();

// Elements
const messageForm = document.getElementById("chatForm");
const messageFormInput = document.getElementById("chatInput");
const messageFormButton = document.getElementById("chatSendButton");
const shareLocationButton = document.getElementById("shareLocationButton")
const messagesDiv = document.getElementById("messages");

// Templates
const messageTemplate = document.getElementById("message-template").innerHTML;
const locationMessageTemplate = document.getElementById("location-message-template").innerHTML;

socket.on("messageFromServer", (message) => {
    console.log(message);

    const html = Mustache.render(messageTemplate, { message });
    messagesDiv.insertAdjacentHTML('beforeend', html);
});

socket.on("locationMessageFromServer", (message) => {
    console.log(message);

    const html = Mustache.render(locationMessageTemplate, { message });
    messagesDiv.insertAdjacentHTML('beforeend', html);
})

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    messageFormButton.setAttribute("disabled", "disabled");

    const messageInput = e.target.elements.message;
    const submittedMessage = messageInput.value;
    
    socket.emit("messageFromClient", submittedMessage, (error) => {
        messageFormButton.removeAttribute("disabled");
        messageFormInput.value = "";
        messageFormInput.focus();

        if (error) {
            return console.error(error);
        }

        console.log("The message was delivered!");
    });
})

shareLocationButton.addEventListener("click", () => {
    if (!navigator.geolocation) {
        return alert("Your browser doesn't support geolocation.");
    }

    shareLocationButton.setAttribute("disabled", "disabled");

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("locationFromClient", { lat: position.coords.latitude, long: position.coords.longitude }, () => {
            shareLocationButton.removeAttribute("disabled");
            console.log("Location sheared!");
        })
    })
})