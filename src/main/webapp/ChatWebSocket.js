var wSocket;
var messagesContainer = document.querySelector("#messagesContainer");




function connect() {
    wSocket = new WebSocket("ws://localhost:9595/chatApp/echo")
    wSocket.onmessage = receiveMessage;
    wSocket.onopen = onOpen;


}


$(document).ready(function () {
    connect();
    console.log("connecting echo")
})

function receiveMessage(evt) {

}

function onOpen() {
    console.log("Connection Established")
    sendName();
}


