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
    var msg = JSON.parse(evt.data);
    let img = "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg";
    if (msg.gender == "Female")
        img = "https://data.whicdn.com/images/295658437/original.jpg";

    if (msg.orientation == 'Right') {

        messagesContainer.innerHTML += '\n' +
            '                    <div class="d-flex justify-content-end mb-4">\n' +
            '                        <div class="msg_cotainer_send">\n' +
            msg.content +
            '                            <span class="msg_time_send">' + msg.date + '</span>\n' +
            '                        </div>\n' +
            '                        <div class="img_cont_msg">\n' +
            '                            <img id="UserPhoto" src="'+img+'" class="rounded-circle user_img_msg">\n' +
            '                              <label class="sender">' + msg.sender + '</label>' +
            '                        </div>\n' +
            '                    </div>\n'
        console.log('send' + msg.sender)
    } else {
        messagesContainer.innerHTML += '   <div class="d-flex justify-content-start mb-4">\n' +
            '                        <div class="img_cont_msg">\n' +
            '                            <img src="'+img+'" class="rounded-circle user_img_msg">\n' +
            '                              <label class="sender">' + msg.sender + '</label>' +
            '                        </div>\n' +
            '                        <div class="msg_cotainer">\n' +
            msg.content +
            '                            <span class="msg_time">' + msg.date + '</span>\n' +
            '                        </div>\n' +
            '                   </div>\n'
        console.log('receive' + msg.sender)
    }

}

function onOpen() {
    console.log("Connection Established")
    sendName();
}

$("#textBox").on('keypress',function(e) {
    if(e.which == 13) {
        sendMessage();
    }
});

