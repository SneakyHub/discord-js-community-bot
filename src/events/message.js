const Discord = require("discord.js");
const config = require("../../config");

module.exports = {
    name: "message",
    run: async (client, message) => {
        if (message.mentions.has(client.user)) {
            return message.channel.send(`My prefix is: ${config.prefix}`);
        }

        if (!message.content.startsWith(config.prefix)) return;
        if (message.author.bot) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (client.commands.has(command)) {
            client.commands.get(command).run(client, message, args);
        }
    }
}