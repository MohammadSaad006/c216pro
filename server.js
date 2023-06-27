const express = require("express");
const { request } = require("http")
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server,{cors:{origin:"*"}})

app.set("view engine", "ejs");
app.use(express.static("public"));

const {v4:uuidv4} = require("uuid")

app.get("/",(req,res)=>{
    res.redirect(`/${uuidv4()}`)

})

app.get("/:room",(req,res)=>{
    res.render("index",{roomid:req.params.room})
})

io.on("connection",(socket)=>{
    socket.on("message",(message)=>{
        io.emit("creatmessage",message)
    })
})


server.listen(3030);