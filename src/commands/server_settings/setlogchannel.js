const Guild = require("../../models/Guild")
const Discord = require("discord.js")

module.exports = {
    name: "setlogchannel",
    aliases: ["set-log-channel"],
    description: "Sets the channel where the bot will log events such as mutes.",
    category: "Server-Settings",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) {
            client.sendErrorEmbed(message, "You have insufficient permissions to run this command.")
        }
    }
}