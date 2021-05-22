const Discord = require("discord.js");
const ms = require("ms");
const logs = require("../../../config").logs_channel;
const hd = require("humanize-duration");

module.exports = {
    name: "mute",
    aliases: [],
    run: async (client, message, args) => {
        let ids = "826924370210979851" || "828319282068324382" || "825702803355467806";
        let muted_id = "828453063970127902";

        let roles = [];
        message.member.roles.cache.forEach(r => {
            if (roles.includes(r.id)) return;
            roles.push(r.id);
        });

        if (roles.includes("826924370210979851") || roles.includes("828319282068324382") || roles.includes("825702803355467806")) {
            if (message.guild.me.hasPermission("MANAGE_ROLES")) {
                let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
                let role = message.guild.roles.cache.find(r => r.id == muted_id);
                let reason = args.slice(2).join(" ")
                let channel = message.guild.channels.cache.get(logs);
                let duration = args[1] || "5m";

                if (!target) return message.channel.send("Correct usage: <@user> <duration; ex: 5m> <reason; if any>");

                if (message.guild.owner.id == target.user.id) {
                    return message.reply("ha! you can't mute the owner!")
                }

                if (target.roles.highest.position >= message.member.roles.highest.position) {
                    return message.reply("you can't mute someone higher than you.")
                }

                if (target.id == message.author.id) {
                    return message.reply("you can't moderate yourself.");
                }

                if (!reason) return message.reply("please provide a reason.")

                try {
                    target.roles.add(role);
                    message.channel.send(`${target.user.tag} has been muted for ${hd(ms(duration))}.\n\nMuted By: ${message.author}\nReason: *${reason}*`);

                    const embed = new Discord.MessageEmbed()
                        .setTitle("Action: Mute")
                        .addFields(
                            {
                                name: "Moderator",
                                value: `${message.author}`
                            },
                            {
                                name: "User Moderated",
                                value: `${target}`
                            },
                            {
                                name: "Duration",
                                value: `${hd(ms(duration))}`
                            },
                            {
                                name: "Reason",
                                value: `${reason}`
                            }
                        )

                    channel.send(embed);

                    setTimeout(() => {
                        target.roles.remove(role);
                    }, ms(`${duration}`));
                } catch (error) {
                    message.channel.send("Correct usage: <@user> <duration; ex: 5m> <reason; if any>");
                    return console.error(error);
                }
            } else {
                return message.channel.send("I require the Manage Roles permission to mute people.");
            }
        } else {
            return message.channel.send("You aren't allowed to run this command.");
        }
    }
}