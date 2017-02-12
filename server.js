email = process.argv[2];
password = process.argv[3];

var
	Chat = require('./services/Chat'),
	express = require('express'),
	app = express(),
	port = process.env.PORT || 8000;

console.log(email, password);

Chat
    .login(email, password)
    .then(function (api) {
    	return Chat.listen(api);
    })
    .then(function (message) {
    	var thread_info;

        return Chat
    		.getThreadInfo(message)
    		.then(function (info) {
                thread_info = info;
    			return Chat.getUserInfo(info);
    		})
    		.then(function (participants_info) {
    			return Chat.sendMessage(message.body, message.senderID, thread_info, participants_info);
    		});
    })
    .catch(function (err) {
    	if (!err) {
    		return console.log("No message body found");
    	}

    	return console.log(err);
    });

app.listen(port);
