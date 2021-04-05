const Discord = require("discord.js");
const config = require("../../config");
const cooldowns = new Discord.Collection();

module.exports = {
    name: "message",
    run: async (client, message) => {
        if (message.mentions.has(client.user)) {
            return message.channel.send(`My prefix is: ${config.prefix}`);
        }

        if (!message.content.startsWith(config.prefix || `<@!${client.user.id}>`)) return;
        if (message.author.bot) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (client.commands.has(command)) {
            if (cooldowns.has(message.author.id)) {
                return message.reply("please wait for the command cooldown to end before attempting to run a command.");
            } else {
                client.commands.get(command).run(client, message, args);

                cooldowns.set(message.author.id);
                setTimeout(() => {
                    cooldowns.delete(message.author.id);
                }, 5000);
            }
        }
    }
}