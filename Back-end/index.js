const express = require('express');
const app = express();
const cors = require('cors');


const connecttomongodb = require('./DBconnect');
connecttomongodb()

// For using process.env:
const dotenv = require('dotenv');
const errorhandle = require('./Middleware/Errorhandling');
dotenv.config();

app.use(cors());
// For incoming request to be recorginised as json object :
app.use(express.json());

app.use("/api/user", require('./Routes/Userroutes'));
app.use("/api/chat", require('./Routes/Chatroutes'));
app.use("/api/message", require('./Routes/Messageroutes'));

app.use(require("./Middleware/Errorhandling"));

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`Server listening at port http://localhost:${port}`)
})
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})
io.on("connection", (socket) => {
    socket.on("setup", id => {
        socket.join(id);
    })

    socket.on("join room", (id) => {
        socket.join(id);
    })
    socket.on("send", (response) => {
        socket.broadcast.to(response.chat._id).emit("receive", response);
    })

    socket.on("typing", (room) => {
        socket.broadcast.to(room).emit("show loading", room);
    })

    socket.on("stop typing", (room) => {
        socket.broadcast.to(room).emit("stop loading", room);
    })
})
