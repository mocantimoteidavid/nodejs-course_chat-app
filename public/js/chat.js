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
const sidebarTemplate = document.getElementById("sidebar-template").innerHTML;

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

socket.on("messageFromServer", (message) => {
    console.log(message);

    const html = Mustache.render(messageTemplate, { 
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format("h:mm a")
    });
    messagesDiv.insertAdjacentHTML('beforeend', html);
});

socket.on("locationMessageFromServer", (message) => {
    console.log(message);

    const html = Mustache.render(locationMessageTemplate, { 
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format("h:mm a")
    });
    messagesDiv.insertAdjacentHTML('beforeend', html);
});

socket.on("roomData", (roomData) => {
    const { room, users } = roomData;
    const html = Mustache.render(sidebarTemplate, { room, users });
    document.getElementById("sidebar").innerHTML = html;
});

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

socket.emit("join", { username, room }, (error) => {
    if (error) {
        alert(error);
        location.href = "/";
    }
});