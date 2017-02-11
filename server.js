var
	login = require('facebook-chat-api'),
	// handler = require('./functions/handler'),
	Sam = require('./config/Sam');

// login({
// 	email: Sam.email,
// 	password: Sam.password,
// }, handler);

login({
	email: Sam.email,
	password: Sam.password,
}, function callback (err, api) {
    if (err) return console.error(err);

    var participant_names = [];

 	api.listen(function callback_listen(err, message) {
		if (err) return console.error(err);

		var message_body = message.body;

        api.getThreadInfo(message.threadID, function callback_getThreadInfo(err, info) {
        	if (err) return console.error(err);

        	api.getUserInfo(info.participantIDs, function (err, participant_info) {
        		for (var prop in participant_info) {
        			if (participant_info.hasOwnProperty(prop)) {
        				participant_names.push(participant_info[prop].firstName);
        			}
        		}

        		for (var id in participant_names) {
        			
        			if (message_body.includes(id)) {
        				api.sendMessage("You've been mentioned!", id);
        			}
        		}
        	});
        });
    });
});
