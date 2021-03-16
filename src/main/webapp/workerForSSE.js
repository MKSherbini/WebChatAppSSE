var eventSource = new EventSource("SSEChatView");
eventSource.onopen =openConnection;
eventSource.onmessage= receiveSSE;
eventSource.addEventListener("updateMessages",receiveMessage);
eventSource.addEventListener("updateOnlineUsers",updateUsers);
function updateUsers(event){
    console.log("Received new Users list")
    var msg = JSON.parse(event.data);
}

this.onmessage=function (event){
    var msg = JSON.parse(event.data);
    let img = "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg";
    if (msg.gender == "Female")
        img = "https://data.whicdn.com/images/295658437/original.jpg";
    var result;
    if (msg.orientation == 'Right') {

        result= '\n' +
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
       result= '   <div class="d-flex justify-content-start mb-4">\n' +
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

        postMessage(result);
}