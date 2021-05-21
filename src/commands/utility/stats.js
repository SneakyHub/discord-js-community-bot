const Discord = require("discord.js");
const HD = require("humanize-duration");

module.exports = {
    name: "stats",
    aliases: ["bot-stats"],
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag)
            .setTitle("Bot Statistics")
            .addFields(
                {
                    name: "Users",
                    value: `${client.userCache.filter(u => !u.bot).size}`
                },
                {
                    name: "Bot Users",
                    value: `${client.userCache.filter(u => u.bot).size}`
                },
                {
                    name: "API Latency",
                    value: `${client.ws.ping} ms`
                },
                {
                    name: "Memory Usage",
                    value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
                },
                {
                    name: "Uptime",
                    value: `${HD(client.uptime, { round: true })}`
                }
            )

        message.channel.send(embed);
    }
}