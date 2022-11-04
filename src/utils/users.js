const users = []

const addUser = ({ id, username, room }) => {
    // Clean the data
    const cleanUsername = username.trim().toLowerCase();
    const cleanRoom = room.trim().toLowerCase();

    // Validate the data
    if (!cleanUsername || !cleanRoom) {
        return {
            error: "Username and room are required!"
        }
    }

    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    });

    // Validate the username
    if (existingUser) {
        return {
            error: "Username is already in use!"
        }
    }

    // Store user
    const user = { id, username: cleanUsername, room: cleanRoom };
    users.push(user);
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users[index];
    }

    return undefined

}

const getUsersInRoom = (room) => {
    const usersInRoom = users.filter((user) => user.room === room);

    return usersInRoom;
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom };