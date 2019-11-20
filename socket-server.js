const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT=process.env.PORT || 9090;

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/public/socket-client.html")
})

io.on("connection", client => {
    console.log("Client connected");
    client.emit("acknowledge", {data : "Connected Now"})

    client.on("MsgToServer", ({chatterName, message}) => {
        console.log("Client Says : " + message);
        client.emit("MsgToClient", {chatterName : 'Me', message});
        client.broadcast.emit("MsgToClient", {chatterName, message});
    })

    client.on("disconnect", () => {
        console.log("Client disconnected!");
    })
})

server.listen(PORT, () => {
    console.log("Socket server started at port : "+PORT)
})