const db = require("quick.db");
const afks = new db.table("AFKs");

module.exports = {
    name: "message",
    run: async (client, message) => {
        if (message.author.bot) return;
        if (message.channel.parentID == "825707535444344873") return

        message.mentions.users.array().forEach(member => {
            if (afks.has(member.id)) {
                message.reply(`${member.tag} is currently AFK: ${afks.fetch(member.id)}`);
            }
        });
    }
}