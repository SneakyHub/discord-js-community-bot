const Guild = require("../../models/Guild")
const Discord = require("discord.js")

module.exports = {
    name: "setlogchannel",
    aliases: ["set-log-channel"],
    description: "Sets the channel where the bot will log events such as mutes.",
    category: "Server-Settings",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) { // admin cuz testing
            const errorEmbed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag)
                .setTitle(":x: Error!")
                .setColor("RED")
                .setThumbnail(message.guild.iconURL())
                .setDescription("You have insufficient permissions to run this command.")
                .setFooter("Powered by SneakyHub")

            return message.channel.send(errorEmbed)
        }
    }
}