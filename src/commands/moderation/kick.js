const Discord = require("discord.js");

module.exports = {
    name: "kick",
    aliases: [],
    run: async (client, message, args) => {
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply("I do not have sufficient permissions to do this.");
        }

        if (message.member.roles.cache.has("828319282068324382") || message.member.roles.cache.has("826924370210979851")) {
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

            if (!member) {
                return message.reply("please provide a user to kick.");
            }

            if (message.guild.owner.id == member.user.id) {
                return message.reply("ha! you can't kick the owner!")
            }

            if (member.roles.highest.position >= message.member.roles.highest.position) {
                return message.reply("you can't kick someone higher than you.")
            }

            if (member.id == message.author.id) {
                return message.reply("you can't moderate yourself.");
            }

            let reason = args.slice(1).join(" ");

            if (!reason) return message.reply("please provide a reason.")

            try {
                member.kick(reason + ` - Kicked by: ${message.author.tag}`);
                message.channel.send(`**${member.user.tag}** has been kicked.\nReason: ${reason}`);
            } catch (error) {
                console.error(error);
                message.channel.send("I was unable to kick the user.");
            }
        } else {
            message.reply("you do not have sufficient permissions to run this command.");
        }
    }
}