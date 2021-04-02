const db = require("quick.db");
const guilds = new db.table("Guilds");

module.exports = {
    name: "guildMemberAdd",
    run: async (client, member) => {
        if (guilds.fetch(`${member.guild.id}.welcome.enabled`) == true) {
            if (!guilds.has(`${member.guild.id}.welcome.channel_id`)) {
                return;
            }
            let channel = member.guild.channels.cache.get(`${guilds.fetch(`${member.guild.id}.welcome.channel_id`)}`);
            let msg = guilds.fetch(`${member.guild.id}.welcome.message`);

            let data = {
                user: `<@!${member.id}>`,
                user_name: `${member.user.username}`,
                user_id: `${member.id}`,
                user_tag: `${member.user.tag}`,
                server_name: `${member.guild.name}`,
                server_id: `${member.guild.id}`
            }

            channel.send(require("../utils/ConvertUserSyntax")(client, msg, data));
        }
    }
}