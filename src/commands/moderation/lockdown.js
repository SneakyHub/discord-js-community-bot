const Discord = require("discord.js");

module.exports = {
    name: "lockdown",
    aliases: [],
    run: async (client, message, args) => {
        if (!message.member.roles.cache.has("828319282068324382") || !message.member.roles.cache.has("826924370210979851")) return;

        let channel = message.mentions.channels.first() || message.channel || message.guild.channels.cache.get(args[0]);

        if (!args[0]) {
            return message.channel.send("Proper usage: `?lockdown <set/remove> <channel>`");
        } else if (args[0] == "set") {
            return channel.overwritePermissions(
                [
                    {
                        id: message.guild.id,
                        deny: ["SEND_MESSAGES"]
                    }
                ]
            );
        } else if (args[0] == "remove") {
            return channel.overwritePermissions(
                [
                    {
                        id: message.guild.id,
                        allow: ["SEND_MESSAGES"]
                    }
                ]
            );
        }
    }
}