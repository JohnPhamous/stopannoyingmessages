email = process.argv[2];
password = process.argv[3];

var
	login = require('facebook-chat-api'),
	express = require('express'),
	app = express(),
	port = process.env.PORT || 8000;

login({
    email: email,
    password: password
}, function callback(err, api) {
    if (err) return console.error(err);

    var
        participant_ids = [],
        participant_names = [];

    api.listen(function callback_listen(err, message) {
        if (err || !message.body) return console.error(err, message);

        if (message.type != "message") {
        	return;
        }

        var message_body = message.body.toLowerCase();
        var message_author = message.senderID;

        api.getThreadInfo(message.threadID, function callback_getThreadInfo(err, info) {
            if (err) return console.error(err);

            participant_ids = info.participantIDs;

            var thread_name = info.name;

            api.getUserInfo(info.participantIDs, function(err, participant_info) {
                for (var prop in participant_info) {
                    if (participant_info.hasOwnProperty(prop)) {
                        participant_names.push(participant_info[prop].firstName.toLowerCase());
                    }
                }

                for (var id in participant_names) {
                    if (message_body.includes(participant_names[id])) {
                        api.sendMessage(
                            "[" + thread_name + "] " +
                            participant_info[message_author].firstName + ": " +
                            message_body,
                            participant_ids[id]);
                    }
                }
            });
        });
    });
});

app.listen(port);
