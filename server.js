email = process.env.EMAIL;
password = process.env.PASSWORD;

var
	Chat = require('./services/Chat'),
	express = require('express'),
	app = express(),
	port = process.env.PORT || 8000;

Chat
    .login(email, password)
    .then(function (api) {
    	return Chat.listen(api);
    })
    .then(function (message) {
    	return Chat
    		.getThreadInfo(message)
    		.then(function (thread_info) {
    			return Chat.getUserInfo(thread_info);
    		})
    		.then(function (participants_info) {
    			return Chat.sendMessage(message.body, message.senderID, thread_info.name, participants_info);
    		});
    })
    .catch(function (err) {
    	if (!err) {
    		return console.log("No message body found");
    	}

    	return console.log(err);
    });

app.listen(port);
