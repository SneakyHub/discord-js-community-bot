const db = require("quick.db");
const guilds = new db.table("Guilds");
const Discord = require("discord.js");
const default_msg = "Welcome to $server_name, $user_ping!";

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
                    },
                    {
                        name: "Current Welcome Message",
                        value: `${guilds.fetch(`${message.guild.id}.welcome.message`) || default_msg}`
                    },
                    {
                        name: "Note",
                        value: `Run \`welcome syntax\` to view the current syntax for users to use in their welcome messages.`
                    }
                )
                .setFooter("This module is currently in Beta, some features might not properly work.")

            message.channel.send(embed);
        } else if (option == "syntax") {
            const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag)
                .setTitle("Welcome Module Syntax")
                .setDescription("This syntax is created and designed for users to use in their welcome messages and easily understand, if you would like to suggest something then please do so.")
                .addField("User", "`$user_ping` - Pings the user.\n`$user_name` - The user's username.\n`$user_id` - The user's ID.\n`$user_tag` - The user's username and discriminator/tag.")
                .addField("Server", "`$server_name` - The server's name.\n`$server_id` - The server's ID.")
                .addField("Note", "This is currently in Beta, things may change.")

            message.channel.send(embed);
        } else if (option == "-enable") {
            guilds.set(`${message.guild.id}.welcome.enabled`, true);
            guilds.set(`${message.guild.id}.welcome.message`, `${default_msg}`);

            message.channel.send("The welcome module has been enabled in this server.");
        } else if (option == "-disable") {
            guilds.set(`${message.guild.id}.welcome.enabled`, false);
            guilds.delete(`${message.guild.id}.welcome.message`);

            message.channel.send("The welcome module has been disabled in this server.");
        } else if (option == "set") {
            let option2 = args[1];

            if (option2 == "-c") {
                let channel = message.mentions.channels.first();

                guilds.set(`${message.guild.id}.welcome.channel_id`, channel.id);

                message.channel.send(`The welcome channel has been set to ${channel}.`);
            } else if (option2 == "-m") {
                let msg = args.slice(2).join(" ");

                guilds.set(`${message.guild.id}.welcome.message`, `${msg}`);

                message.channel.send(`The welcome message has been set.`);
            }
        } else if (option == "delete") {
            let option2 = args[1];

            if (option2 == "-c") {
                guilds.delete(`${message.guild.id}.welcome.channel_id`);

                message.channel.send(`The welcome channel has been deleted.`);
            } else if (option2 == "-m") {
                guilds.set(`${message.guild.id}.welcome.message`, `${default_msg}`);

                message.channel.send(`The welcome message has been deleted and set to the default message.`);
            }
        }
    }
}

function GetWelcomeChannel(guild) {
    if (guilds.has(`${guild.id}.welcome.channel_id`)) {
        return "<#" + guilds.fetch(`${guild.id}.welcome.channel_id`) + ">";
    } else {
        return "No channel has been set, please set a channel or the welcome module won't work properly.";
    }
}

function GetWelcomeMessage(guild) {
    if (guilds.has(`${guild.id}.welcome.message`)) {
        return guilds.fetch(`${guild.id}.welcome.message`);
    } else {
        return "Custom message hasn't been set.";
    }
}