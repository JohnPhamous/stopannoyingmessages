
module.exports = function (err, message) {
    api.getThreadInfo(message.threadID, getThreadInfo);
};