module.exports = {
    name: "guildMemberAdd",
    run: async (client, member) => {
        let channel_id = "826544543297437766";
        let channel = member.guild.channels.cache.find(c => c.id == `${channel_id}`);

        channel.send(`${member} welcome to ${member.guild.name}, head over to <#825797019103789056> to get started with hosting! If you need help feel free to ask for it in <#828253375387795486>!`);
    }
}