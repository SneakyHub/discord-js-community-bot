const db = require("quick.db");
const user_tickets = new db.table("user_tickets");

module.exports = {
    name: "raw",
    run: async (client, payload) => {
        if (payload.t == "MESSAGE_REACTION_ADD") {
            if (payload.d.message_id == user_tickets.fetch("msg_setup_id")) {
                let channel = client.channels.cache.get(payload.d.channel_id);

                if (channel.messages.cache.has(payload.d.message_id)) {
                    return;
                } else {
                    channel.messages.fetch(payload.d.message_id).then(message => {
                        let reaction = message.reactions.cache.get("🎫");
                        if (client.users.cache.has(payload.d.user_id)) {
                            client.emit("messageReactionAdd", client, reaction, client.users.cache.get(payload.d.user_id));
                        } else {
                            client.users.fetch(payload.d.user_id).then(user => {
                                client.emit("messageReactionAdd", client, reaction, user);
                            }).catch(error => {
                                console.error(error);
                            });
                        }
                    }).catch(error => {
                        return console.error(error);
                    });
                }
            }
        }
    }
}