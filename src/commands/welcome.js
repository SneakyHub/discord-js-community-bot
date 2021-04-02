const db = require("quick.db");
const guilds = new db.table("Guilds");
const Discord = require("discord.js");

module.exports = {
    name: "welcome",
    aliases: [],
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_SERVER")) {
            return message.reply("you do not have permissions to manage this server's settings.");
        }

        let option = args[0];

        if (!option) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag)
                .setTitle("Welcome Settings")
                .addFields(
                    {
                        name: "Channel",
                        value: `${GetWelcomeChannel(message.guild)}`
                    },
                    {
                        name: "Message",
                        value: `${GetWelcomeMessage(message.guild)}`
                    },
                    {
                        name: "Sub Commands",
                        value: `\`set -c <#channel>\` - Sets the welcome channel.\n\`set -m <message>\` - Sets the welcome message.\n\`-enable\` - Enables the welcome module.\n\`delete -c \` - Deletes the welcome channel from the database.\n\`delete -m \` - Deletes the welcome message from the database.\n\`disable\` - Disables the welcome module.`
                    }
                )
                .setFooter("This module is currently in Beta, some features might not properly work.")

            message.channel.send(embed);
        }
    }
}

function GetWelcomeChannel(guild) {
    if (guilds.has(`${guild.id}.welcome.channel_id`)) {
        return guilds.fetch(`${guild.id}.welcome.channel_id`);
    } else {
        return "None";
    }
}

function GetWelcomeMessage(guild) {
    if (guilds.has(`${guild.id}.welcome.message`)) {
        return guilds.fetch(`${guild.id}.welcome.message`);
    } else {
        return "None";
    }
}