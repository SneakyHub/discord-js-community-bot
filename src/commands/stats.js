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
                    name: "Servers",
                    value: `${client.guilds.cache.size}`
                },
                {
                    name: "Users",
                    value: `${client.users.cache.size}`
                },
                {
                    name: "API Latency",
                    value: `${client.ws.ping} ms`
                },
                {
                    name: "Memory Usage",
                    value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`
                },
                {
                    name: "Uptime",
                    value: `${HD(client.uptime, { round: true })}`
                }
            )

        message.channel.send(embed);
    }
}