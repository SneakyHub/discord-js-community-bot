const db = require("quick.db");
const guilds = new db.table("Guilds");

module.exports = {
    name: "guildMemberAdd",
    run: async (client, member) => {
        if (guilds.fetch(`${member.guild.id}.welcome.enabled`) == true) {
            let channel = member.guild.channels.cache.get(`${guilds.fetch(`${member.guild.id}.welcome.channel_id`)}`);

            channel.send(`Welcome ${member} to ${member.guild.name}.`);
        }
    }
}