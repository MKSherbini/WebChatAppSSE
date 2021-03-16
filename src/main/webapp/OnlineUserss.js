var onlineListContainer2 = document.querySelector("#onlineUsers");
var messagesContainer = document.querySelector("#messagesContainer");
var eventSource = new EventSource("SSEChatView");
eventSource.onopen =openConnection;
eventSource.onmessage= receiveSSE;
eventSource.addEventListener("updateMessages",receiveMessage);
var wSocket;

function connectWS() {
    wSocket= new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/chatApp/echo");
}

$(document).ready(function () {
    connectWS();
    console.log("connecting echo")
})

function receiveMessage (event){
    console.log("++++"+event.data)
    var msg = JSON.parse(event.data);
    msg.forEach(function (e){
        let img = "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg";
        if (e.gender == "Female")
            img = "https://data.whicdn.com/images/295658437/original.jpg";

        if (e.orientation == 'Right') {

            messagesContainer.innerHTML += '\n' +
                '                    <div class="d-flex justify-content-end mb-4">\n' +
                '                        <div class="msg_cotainer_send">\n' +
                e.content +
                '                            <span class="msg_time_send">' + e.date + '</span>\n' +
                '                        </div>\n' +
                '                        <div class="img_cont_msg">\n' +
                '                            <img id="UserPhoto" src="'+img+'" class="rounded-circle user_img_msg">\n' +
                '                              <label class="sender">' + e.sender + '</label>' +
                '                        </div>\n' +
                '                    </div>\n'
            console.log('send' + e.sender)
        } else {
            messagesContainer.innerHTML += '   <div class="d-flex justify-content-start mb-4">\n' +
                '                        <div class="img_cont_msg">\n' +
                '                            <img src="'+img+'" class="rounded-circle user_img_msg">\n' +
                '                              <label class="sender">' + e.sender + '</label>' +
                '                        </div>\n' +
                '                        <div class="msg_cotainer">\n' +
                e.content +
                '                            <span class="msg_time">' + e.date + '</span>\n' +
                '                        </div>\n' +
                '                   </div>\n'
            console.log('receive' + e.sender)
        }

    })



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

