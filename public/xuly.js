var socket = io("http://localhost:3000");

socket.on("server-send-dky-thatbai", function () {
    alert("Username đã được sử dụng");
    return false;
});

socket.on("server-send-dky-thanhcong", function (data) {
    $("#currentUser").html(data);
    $("#loginForm").hide();
    $("#chatForm").show();
});

socket.on("server-send-list-users", function (data) {
    $("#boxContent").html("");
    data.forEach(function (i) {
        $("#boxContent").append("<div class='user'>" + i + "</div>");
    });
});

$(document).ready(function () {
    $("#loginForm").show();
    $("#chatForm").hide();

    $("#btnRegister").click(function () {
        socket.emit("client-send-username", $("#txtUsername").val());
    });
});