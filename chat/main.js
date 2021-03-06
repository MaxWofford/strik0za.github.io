var config = {
    apiKey: "AIzaSyCRlUIU5WvhRE951elcMgg0cUbCfm3vd1E",
    authDomain: "chat-app-77b76.firebaseapp.com",
    databaseURL: "https://chat-app-77b76.firebaseio.com",
    storageBucket: "chat-app-77b76.appspot.com",
};
firebase.initializeApp(config);

var chatData = firebase.database().ref();

function pushMessage(event) {
    if (event.keyCode == 13) {
        var name = $('#nameInput').val();
        var text = $('#messageInput').val();
        chatData.push({name: name, text: text});
        $('#messageInput').val('');
    }
}

chatData.on("child_added", showMessage);

function showMessage(msg) {
    var message = msg.val();
    var messageSender = message.name;
    var messageContent = message.text;
    
    var messageEl = $("<div/>").addClass("message");    
    var senderEl = $("<span/>").text(messageSender + ": ");
    var contentEl = $("<span/>").text(messageContent);
    
    messageEl.append(senderEl);
    messageEl.append(contentEl);    
    $('#messages').append(messageEl);
}

$('#messageInput').keypress(pushMessage);