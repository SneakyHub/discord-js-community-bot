const Discord = require("discord.js");
const hd = require("humanize-duration");

module.exports = {
    name: "guildMemberAdd",
    run: async (client, member) => {
        let channel_id = "826544543297437766";
        let channel = member.guild.channels.cache.find(c => c.id == `${channel_id}`);

        channel.send(`${member} welcome to ${member.guild.name}, head over to <#825797019103789056> to get started with hosting! If you need help feel free to ask for it in <#828253375387795486>!`);

        if (Date.now() - member.user.createdAt < 259200000) {
            member.ban({ reason: "Account is less than 3 days old. - Banned by Auto-Ban" });
            channel.send(`${member.user.tag} was banned due to the account being less than 3 days old.`);
        } else if (Date.now() - member.user.createdAt < 2419200000) {
            try {
                member.user.send(`Sorry! We only allow accounts over the age of 28 days to join.\nYour account was created ${hd(Date.now() - member.user.createdAt, { round: true })} ago.\n\nYou are welcome to join again once this account is over 28 days old!`);
            } catch (error) {
                return;
            }

            member.kick(`Account is less than 28 days old. - Kicked by Auto-Kick`);
            channel.send(`${member.user.tag} was kicked due to the account being less than 10 days old.`);
        }
    }
}