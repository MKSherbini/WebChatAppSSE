var onlineListContainer2 = document.querySelector("#onlineUsers");
var messagesContainer = document.querySelector("#messagesContainer");
var wSocket;

function connectWS() {
    wSocket = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/chatApp/echo");
}

$(document).ready(function () {
    connectWS();
    startWorker();
    console.log("connecting echo")
})

function receiveMessage(html) {
    messagesContainer.innerHTML += html;
}

function receiveUsers(html) {
    onlineListContainer2.innerHTML = html;
}

function startWorker() {
    if (typeof (Worker) !== "undefined") {
        if (typeof (w) == "undefined") {
            w = new Worker("workerForSSE.js");
        }
        w.onmessage = function (event) {
            let html = event.data;
            console.log(html);
            if (html.startsWith("<li")) {
                receiveUsers(html);
            } else {
                receiveMessage(html);
            }
        };
    } else {
        alert("Die, your browser does not support Web Workers...");
    }
}

$("#textBox").on('keypress', function (e) {
    if (e.which == 13) {
        sendMessage();
    }
});

