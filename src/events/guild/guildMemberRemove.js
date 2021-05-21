const Discord = require("discord.js");
const db = require("quick.db");
const saved_roles = new db.table("saved_roles");

module.exports = {
    name: "guildMemberRemove",
    run: async (client, member) => {
        let array = [];

        member.roles.cache.forEach(role => {
            if (array.includes(role.id)) return;
            array.push(role.id);
        })

        saved_roles.set(`${member.user.id}`, {
            roles: array
        });

        return;
    }
}