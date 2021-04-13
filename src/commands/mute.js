const Discord = require("discord.js");
const ms = require("ms");
const logs = require("../../config").logs_channel;
const hd = require("humanize-duration");

module.exports = {
    name: "mute",
    aliases: [],
    run: async (client, message, args) => {
        let ids = "826924370210979851" || "828319282068324382" || "825702803355467806";
        let muted_id = "828453063970127902";

        let roles = [];
        message.member.roles.cache.forEach(r => roles.push(r.id));

        if (roles.includes(ids)) {
            if (message.guild.me.hasPermission("MANAGE_ROLES")) {
                let target = message.mentions.members.first();
                let role = message.guild.roles.cache.find(r => r.id == muted_id);
                let reason = args.slice(2).join(" ") || "Unspecified";
                let channel = message.guild.channels.cache.get(logs);
                let duration = args[1] || "5s";

                if (!target) return message.channel.send("Correct usage: <@user> <duration; ex: 5s> <reason; if any>");

                try {
                    target.roles.add(role);
                    message.channel.send(`${target.user.tag} has been muted for ${hd(ms(duration))}.\nReason: *${reason}*`);

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
                    message.channel.send("Correct usage: <@user> <duration; ex: 5s> <reason; if any>");
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