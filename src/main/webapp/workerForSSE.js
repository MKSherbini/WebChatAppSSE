var eventSource = new EventSource("SSEChatView");
eventSource.onopen = openConnection;
eventSource.onmessage = receiveSSE;
eventSource.addEventListener("updateMessages", receiveMessage);

function receiveMessage(event) {
    console.log("++++" + event.data)
    var msg = JSON.parse(event.data);
    let retHtml = "";
    msg.forEach(function (e) {
        let img = "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg";
        if (e.gender == "Female")
            img = "https://data.whicdn.com/images/295658437/original.jpg";

        if (e.orientation == 'Right') {

            retHtml += '\n' +
                '                    <div class="d-flex justify-content-end mb-4">\n' +
                '                        <div class="msg_cotainer_send">\n' +
                e.content +
                '                            <span class="msg_time_send">' + e.date + '</span>\n' +
                '                        </div>\n' +
                '                        <div class="img_cont_msg">\n' +
                '                            <img id="UserPhoto" src="' + img + '" class="rounded-circle user_img_msg">\n' +
                '                              <label class="sender">' + e.sender + '</label>' +
                '                        </div>\n' +
                '                    </div>\n'
            console.log('send' + e.sender)
        } else {
            retHtml += '   <div class="d-flex justify-content-start mb-4">\n' +
                '                        <div class="img_cont_msg">\n' +
                '                            <img src="' + img + '" class="rounded-circle user_img_msg">\n' +
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
    postMessage(retHtml);
}

eventSource.addEventListener("updateOnlineUsers", function (event) {
    console.log("Received new Users list")
    var msg = JSON.parse(event.data);
    let retHtml = "";
    msg.forEach(function (e) {
        console.log("###" + e.gender)
        if (e.gender == 'Male') {
            retHtml +=
                '<li class="active">' +
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
            retHtml +=
                '<li class="active">' +
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
    postMessage(retHtml);
});

function openConnection() {
    console.log("Connection opened")
}

function receiveSSE(event) {
    console.log(event.data + "From default Event")
}


