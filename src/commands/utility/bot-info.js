const Discord = require('discord.js');
const os = require('os');
const moment = require('moment');
require("moment-duration-format");

module.exports = {
    name: "bot-info",
    aliases: ["info", "botinfo"],
    run: async (client, message, args) => {
        let osType = await os.type();
        let space = 0;

        if (osType === "Darwin") osType = "macOS";
        else if (osType === "Windows") osType = "Windows";
        else osType = os.type();

        require("../utils/StorageSpaceUsed").get(client, "../../src").then(response => {
            space = response;
        });

        const embed = {
            color: 3447003,
            title: "Bot Information",
            fields: [
                {
                    name: "Bot Owner",
                    value: client.users.cache.get("716761186812821604"),
                    inline: true
                },
                {
                    name: "Uptime",
                    value: moment
                        .duration(client.uptime)
                        .format("d [Days], h [Hours], m [Minutes], s [Seconds]"),
                    inline: true
                },
                {
                    name: "Server OS",
                    value: `${osType}`,
                    inline: true
                },
                {
                    name: "Memory",
                    value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
                    inline: true
                },
                {
                    name: "Storage Used",
                    value: `${space} KB`,
                    inline: true
                },
                {
                    name: "CPU Model",
                    value: `${os.cpus().map(i => `${i.model}`)[0]}`,
                    inline: true
                },
                {
                    name: "CPU Usage",
                    value: `${Math.round(require("os").loadavg()[0] * 100) / 100}%`,
                    inline: true
                },
                {
                    name: "General Information",
                    value: `Servers: ${client.guilds.cache.size}\nChannels: ${client.channels.cache.size}\nUsers: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
                    inline: true
                },
                {
                    name: "Version Information",
                    value: `Discord.JS: v${Discord.version}\nNode.JS: ${process.version}`,
                    inline: true
                }
            ],
            thumbnail: {
                url: client.user.displayAvatarURL()
            }
        };

        return message.channel.send({ embed });
    }
}