const Discord = require("discord.js");

module.exports = {
    name: "lockdown",
    aliases: [],
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return;

        let channel = message.mentions.channels.first() || message.channel || message.guild.channels.cache.get(args[0]);

        if (!args[0]) {
            message.channel.send("Proper usage: `?lockdown <set/remove> <channel>`");
        } else if (args[0] == "set") {
            channel.overwritePermissions(
                [
                    {
                        id: message.guild.id,
                        deny: ["SEND_MESSAGES"]
                    }
                ]
            );
        } else if (args[0] == "remove") {
            channel.overwritePermissions(
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