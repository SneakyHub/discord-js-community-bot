const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "ping",
    aliases: ["latency", "test"],
    run: async (client, message, args) => {
        message.channel.send("Pinging...").then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp;

            if (ping < db.fetch(`Lowest_Bot_Ping`)) {
                db.set("Lowest_Bot_Ping", ping);
            }

            const embed = new Discord.MessageEmbed()
                .addField("Ping", `${ping} ms`)
                .addField("API Latency", `${client.ws.ping} ms`)
                .addField("Lowest Ping", `${db.fetch("Lowest_Bot_Ping")} ms`)

            m.edit("", embed);
        });
    }
}