var onlineListContainer2 = document.querySelector("#onlineUsers");
var messagesContainer = document.querySelector("#messagesContainer");
var eventSource = new EventSource("SSEChatView");
eventSource.onopen =openConnection;
eventSource.onmessage= receiveSSE;
eventSource.addEventListener("updateMessages",receiveMessage);
var wSocket;
var working;
$(document).ready(function () {
    connectWS();
    startWorker();
    console.log("connecting echo")
})
function startWorker(){
    if(typeof (Worker)!=="undefined"){
        working = new Worker("workerForSSE.js");
    }
}
function connectWS() {
    wSocket= new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/chatApp/echo");
}



function receiveMessage (event){

    working.postMessage(event);

}
working.onmessage =function (result){
    messagesContainer +=result.data;
}
eventSource.addEventListener("updateOnlineUsers",function (event){
    console.log("Received new Users list")
    var msg = JSON.parse(event.data);
    onlineListContainer2.innerHTML = "";
    msg.forEach(function (e) {
        console.log("###"+e.gender)
        if (e.gender == 'Male') {
            onlineListContainer2.innerHTML +=
                '                    <li class="active">' +
                '                        <div class="d-flex bd-highlight">' +
                '                            <div class="img_cont">' +
                '                                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img">\n' +
                '                                <span class="online_icon"></span>' +
                '                            </div>\n' +
                '                            <div class="user_info">' +
                '                                <span>' + e.name + '</span>' +
                '                                <p>' + e.name + ' is online</p>' +
                '                            </div>' +
                '                        </div>' +
                '                    </li>' +
                '                    '
        } else {
            onlineListContainer2.innerHTML +=
                '                    <li class="active">' +
                '                        <div class="d-flex bd-highlight">' +
                '                            <div class="img_cont">' +
                '                                <img src="https://data.whicdn.com/images/295658437/original.jpg" class="rounded-circle user_img">\n' +
                '                                <span class="online_icon"></span>' +
                '                            </div>\n' +
                '                            <div class="user_info">' +
                '                                <span>' + e.name + '</span>' +
                '                                <p>' + e.name + ' is online</p>' +
                '                            </div>' +
                '                        </div>' +
                '                    </li>' +
                '                    '
        }
    })
})

function openConnection(){
    console.log("Connection opened")
}
function receiveSSE (event){
    console.log(event.data + "From default Event")
}

$("#textBox").on('keypress',function(e) {
    if(e.which == 13) {
        sendMessage();
    }
});

