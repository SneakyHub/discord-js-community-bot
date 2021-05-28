const Guild = require("../../models/Guild")

module.exports = {
    name: "guildCreate",
    run: async (client, guild) => {
        new Guild({
            guildId: guild.id,
            guildName: guild.name
        }).save()
    }
}