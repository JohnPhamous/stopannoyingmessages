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

    var
    	participant_ids = [],
    	participant_names = [];

 	api.listen(function callback_listen(err, message) {
		if (err || !message.body) return console.error(err, message);

		var message_body = message.body.toLowerCase();

        api.getThreadInfo(message.threadID, function callback_getThreadInfo(err, info) {
        	if (err) return console.error(err);

        	participant_ids = info.participantIDs;

        	api.getUserInfo(info.participantIDs, function (err, participant_info) {
        		for (var prop in participant_info) {
        			if (participant_info.hasOwnProperty(prop)) {
        				participant_names.push(participant_info[prop].firstName.toLowerCase());
        			}
        		}

        		for (var id in participant_names) {
        			if (message_body.includes(participant_names[id])) {
        				api.sendMessage("You've been mentioned!", participant_ids[id]);
        			}
        		}
        	});
        });
    });
});
