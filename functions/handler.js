var listener = require('./listener');

module.exports = function (err, api) {
    if (err) return console.error(err);

    api.listen(listener);
}