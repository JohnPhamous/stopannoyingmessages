var login = require('facebook-chat-api');
var Sam = require('./config/Sam');

login({
	email: Sam.email,
	password: Sam.password,
}, function callback (err, api) {
    if(err) return console.error(err);

    api.listen(function callback(err, message) {
        api.sendMessage(message.body, message.threadID);
    });
});