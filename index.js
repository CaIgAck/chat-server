const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});

const port = 3000;

server.listen(port, () => {
    console.log("server listener on port", port)
})


