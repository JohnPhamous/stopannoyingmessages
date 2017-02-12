var
	Login = require('facebook-chat-api'),
	$q = require('q'),
    API;

module.exports = {
	login: function (email, password) {
		var deferred = $q.defer();
		
		Login({
		    email: email,
		    password: password
		}, function (err, api) {
			if (err) {
				return deferred.reject(err);
			}

			return deferred.resolve(api);
		})

		return deferred.promise;
	},
	listen: function (api) {
		var deferred = $q.defer();

        API = api;

        API.listen(function (err, message) {
            if (err) {
                return deferred.reject(err);
            } else if (!message || message.type != "message") {
                return deferred.reject(err);
            }

            return deferred.resolve(message);
        });

        return deferred.promise;
	},
    getThreadInfo: function (message) {
        var deferred = $q.defer();

        API.getThreadInfo(message.threadID, function (err, thread_info) {
            if (err) {
                return deferred.reject(err);
            }

            return deferred.resolve(thread_info);
        });

        return deferred.promise;
    },
    getUserInfo: function (thread_info) {
        var
            deferred = $q.defer(),
            participant_ids = thread_info.participantIDs,
            thread_name = thread_info.name;

        API.getUserInfo(participant_ids, function (err, participants_info) {
            if (err) {
                return deferred.reject(err);
            }

            return deferred.resolve(participants_info);
        });

        return deferred.promise;
    },
    sendMessage: function (message_body, message_author, thread_info, participants_info) {
        var
            deferred = $q.defer(),
            participants_names = [];

        for (var prop in participants_info) {
            if (participants_info.hasOwnProperty(prop)) {
                participants_names.push(participants_info[prop].firstName.toLowerCase());
            }
        }

        for (var id in participants_names) {
            if (message_body.includes(participants_names[id])) {
                API.sendMessage(
                    "[" + thread_info.name + "] " +
                    participants_info[message_author].firstName + ": " +
                    message_body,
                    thread_info.participantIDs[id]);
            }
        }
    }
};
