var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

app.get("/", function (req, res) {
    res.render("trangchu");
});

var mangUsers = ["aaa"];
io.on("connection", function (socket) {
    console.log("Co nguoi ket noi ID = " + socket.id);

    socket.on("client-send-username", function (data) {
        if (mangUsers.indexOf(data) >= 0) {
            //fail
            socket.emit("server-send-dky-thatbai");
        } else {
            //success
            mangUsers.push(data);
            socket.userName = data;
            socket.emit("server-send-dky-thanhcong", data);
            io.sockets.emit("server-send-list-users", mangUsers);
        }
    });
});