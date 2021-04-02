const db = require("quick.db");
const guilds = new db.table("Guilds");
const Discord = require("discord.js");

module.exports = {
    name: "welcome",
    aliases: [],
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) {
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
                        value: `\`set -c <#channel>\` - Sets the welcome channel.\n\`set -m <message>\` - Sets the welcome message.\n\`-enable\` - Enables the welcome module.\n\`delete -c \` - Deletes the welcome channel from the database.\n\`delete -m \` - Deletes the welcome message from the database.\n\`-disable\` - Disables the welcome module.`
                    }
                )
                .setFooter("This module is currently in Beta, some features might not properly work.")

            message.channel.send(embed);
        } else if (option == "-enable") {
            guilds.set(`${message.guild.id}.welcome.enabled`, true);

            message.channel.send("The welcome module has been enabled in this server.");
        } else if (option == "-disable") {
            guilds.set(`${message.guild.id}.welcome.enabled`, false);

            message.channel.send("The welcome module has been disabled in this server.");
        } else if (option == "set") {
            let option2 = args[1];

            if (option2 == "-c") {
                let channel = message.mentions.channels.first();

                guilds.set(`${message.guild.id}.welcome.channel_id`, channel.id);

                message.channel.send(`The welcome channel has been set to ${channel}.`);
            }
        } else if (option == "delete") {
            let option2 = args[1];

            if (option2 == "-c") {
                guilds.delete(`${message.guild.id}.welcome.channel_id`);

                message.channel.send(`The welcome channel has been deleted.`);
            }
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