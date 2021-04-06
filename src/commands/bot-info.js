const Discord = require('discord.js');
const os = require('os');
const moment = require('moment');
require("moment-duration-format");

module.exports = {
  name: "bot-info",
  aliases: ["info"],
  run: async (client, message, args) => {
    // code here
    var msg = await message.channel.send("Getting Status...");

    var osType = await os.type();

    if (osType === "Darwin") osType = "macOS";
    else if (osType === "Windows") osType = "Windows";
    else osType = os.type();

    var embed = {
      color: 3447003,
      description: "**Status**",
      fields: [
        {
          name: "❯ Bot Owner",
          value: client.users.cache.get("716761186812821604"),
          inline: false
        },
        {
          name: "❯ Uptime",
          value: moment
            .duration(client.uptime)
            .format("D [Day], H [Hour], m [Minutes], s [Seconds]"),
          inline: false
        },
        {
          name: "❯ Server OS",
          value: `${osType}`,
          inline: false
        },
        {
          name: "❯ Memory",
          value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
          inline: false
        },
        {
          name: "❯ CPU Model",
          value: `• ${os.cpus().map(i => `${i.model}`)[0]} `,
          inline: false
        },
        {
          name: "❯ CPU Usage",
          value: `• ${Math.round(require("os").loadavg()[0] * 100) / 100}%`,
          inline: false
        },
        {
          name: " ❯ General İnformations",
          value: `             
• Server: ${client.guilds.cache.size}                   
• Channel: ${client.channels.cache.size}                   
• User: ${client.guilds.cache
              .reduce((a, b) => a + b.memberCount, 0)
              .toLocaleString()}
                    `,
          inline: false
        },

        {
          name: "❯ Versions",
          value: `
           • Discord.js: v${Discord.version}
           • Node: ${process.version}
                    `,
          inline: false
        }
      ],
      thumbnail: { url: client.user.displayAvatarURL() }
    };

    return message.edit("", { embed });
  }
}