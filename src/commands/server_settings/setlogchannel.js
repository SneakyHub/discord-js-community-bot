const Guild = require("../../models/Guild")

module.exports = {
    name: "setlogchannel",
    aliases: ["set-log-channel"],
    description: "Sets the channel where the bot will log events such as mutes.",
    category: "Server-Settings",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) {
            return client.sendErrorEmbed(message, "You have insufficient permissions to run this command.")
        }

        let newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])

        if (!newChannel) {
            return client.sendErrorEmbed(message, "Please mention or provide the ID of a channel.")
        }

        await Guild.updateOne({ guildId: message.guild.id }, {
            logChannel: newChannel.id
        })

        client.sendEmbed(message, {
            title: "Log Channel Updated",
            color: "GREEN",
            description: `The log channel for ${message.guild.name} has been set to ${newChannel}.`
        })
    }
}