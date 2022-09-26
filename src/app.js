const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
    console.log("New web socket connection found");

    socket.emit("messageFromServer", "Welcome!");
    socket.broadcast.emit("messageFromServer", "A new user has joined!");

    socket.on("messageFromClient", (message) => { 
        io.emit("messageFromServer", message);
    });

    socket.on("disconnect", () => {
        io.emit("messageFromServer", "A user has left!");
    })

    socket.on("locationFromClient", (locationObject) => { 
        const locationLink = `https://google.com/maps?q=${locationObject.lat},${locationObject.long}`
        io.emit("messageFromServer", locationLink);
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports = app;