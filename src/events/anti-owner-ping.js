const logs = require("../../config").logs_channel;
const ms = require("ms");
const hd = require("humanize-duration");
const db = require("quick.db");
const owner_pings = new db.table("Anti_Owner_Pings");

module.exports = {
    name: "message",
    run: async (client, message) => {
        if (message.author.bot) return;
        if (message.author.id == "746113176885657701") return;

        let muted_id = "828453063970127902";
        let channel = message.guild.channels.cache.get(logs);
        let role = message.guild.roles.cache.find(r => r.id == muted_id);
        let duration = "10m";
        let reason = "Pinging the owner multiple times in a short amount of time.";
        let ids = "826924370210979851" || "828319282068324382" || "825702803355467806";

        let roles = [];
        message.member.roles.cache.forEach(r => roles.push(r.id));

        if (message.mentions.has(message.guild.owner)) {
            if (roles.includes(ids)) {
                return
            } else {
                if (!owner_pings.has(message.author.id) || owner_pings.get(message.author.id) < 3) {
                    owner_pings.add(message.author.id, 1);
                    message.reply(`please do not ping or DM the owner. You have ${3 - owner_pings.get(message.author.id)} warning(s) left before a 10 minute mute.`);
                    setTimeout(() => {
                        owner_pings.subtract(message.author.id, 1);
                    }, 2500);
                } else if (owner_pings.get(message.author.id) == 3) {
                    owner_pings.delete(message.author.id);

                    message.member.roles.add(role);
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Action: Mute")
                        .addFields(
                            {
                                name: "Moderator",
                                value: `${client.user}`
                            },
                            {
                                name: "User Moderated",
                                value: `${message.member}`
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
                    message.channel.send(`${message.author.tag} has been muted for ${hd(ms(duration))}.\nReason: *${reason}*`);

                    setTimeout(() => {
                        message.member.roles.remove(role);
                    }, ms(duration));
                }
            }
        }
    }
}