const Discord = require("discord.js");
const hd = require("humanize-duration");

module.exports = {
    name: "user-info",
    aliases: ["userinfo"],
    run: async (client, message, args) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if (!member) return message.reply("please provide a valid user or user ID.");

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag)
            .setTitle("User Information")
            .setThumbnail(member.user.displayAvatarURL())
            .addFields(
                {
                    name: "Username",
                    value: `${member.user.tag}`
                },
                {
                    name: "Display Name",
                    value: `${member.displayName}`
                },
                {
                    name: "Account Created",
                    value: `${hd(Date.now() - member.user.createdAt, { round: true })} ago`
                },
                {
                    name: "Joined Server",
                    value: `${hd(Date.now() - member.joinedAt, { round: true })} ago`
                },
                {
                    name: "Roles",
                    value: `${member.roles.cache.array()}`
                },
                {
                    name: "Permissions",
                    value: `\`${member.permissions.toArray()}\``
                }
            )

        message.channel.send(embed);
    }
}