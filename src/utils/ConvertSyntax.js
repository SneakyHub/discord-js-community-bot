const db = require("quick.db");

module.exports.run = function (client, text, data) {
    let _text = text;

    if (_text.includes("$user_ping")) {
        _text = _text.replace("$user_ping", `<@${data.user.id}>`);
    }

    if (_text.includes("$user_name")) {
        _text = _text.replace("$user_name", data.user.username);
    }

    if (_text.includes("$user_id")) {
        _text = _text.replace("$user_id", data.user.id);
    }

    if (_text.includes("$user_tag")) {
        _text = _text.replace("$user_tag", data.user.tag);
    }

    if (_text.includes("$server_name")) {
        _text = _text.replace("$server_name", data.guild.name);
    }

    if (_text.includes("$server_id")) {
        _text = _text.replace("$server_id", data.guild.id);
    }

    return _text;
}