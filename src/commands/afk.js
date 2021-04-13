const Discord = require("discord.js");
const db = require("quick.db");
const afks = new db.table("AFKs");

module.exports = {
    name: "afk",
    aliases: [],
    run: async (client, message, args) => {

        if (!args[0]) {
            afks.delete(message.author.id);

            message.reply("your afk was removed.");
        } else {
            let m = args.slice(1).join(" ");

            afks.set(message.author.id, m);

            message.channel.send("Your AFK has been set.");
        }
    }
}