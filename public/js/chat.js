const socket = io();

socket.on("messageFromServer", (message) => {
    console.log(message);
});

const messageForm = document.getElementById("chatForm");
const messageFormInput = document.getElementById("chatInput");
const messageFormButton = document.getElementById("chatSendButton");
const shareLocationButton = document.getElementById("shareLocationButton")

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