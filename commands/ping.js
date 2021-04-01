const Discord = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["latency", "test"],
    run: async (client, message, args) => {
        message.channel.send("Pinging...").then(m => {
            const embed = new Discord.MessageEmbed()
                .addField("Ping", `${m.createdTimestamp - message.createdTimestamp} ms`)
                .addField("API Latency", `${client.ws.ping} ms`)

            m.edit("", embed);
        });
    }
}