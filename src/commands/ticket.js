const Discord = require("discord.js");
const db = require("quick.db");
const user_tickets = new db.table("user_tickets");

module.exports = {
    name: "ticket",
    aliases: [],
    run: async (client, message, args) => {
        if (args[0] == "close") {
            if (message.channel.name.startsWith("ticket-")) {
                user_tickets.set(`${message.channel.id}.open`, false);

                message.channel.edit({
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: user_tickets.fetch(`${message.channel.id}.owner`),
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: client.user.id,
                            allow: ["MANAGE_CHANNELS", "VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "ADD_REACTIONS", "MANAGE_MESSAGES"]
                        },
                        {
                            id: "826924370210979851", // helper role ID
                            allow: ["VIEW_CHANNEL"]
                        }
                    ]
                });

                message.delete();

                message.channel.send("This ticket has been closed.").then(msg => msg.delete({ timeout: 2000 }));
            } else {
                return
            }
        } else if (args[0] == "reopen") {
            if (message.channel.name.startsWith("ticket-")) {
                let channel = user_tickets.fetch(`${message.channel.id}`);
                let user = channel.owner;
                let open = user_tickets.fetch(`${user}.current_channel_id`);

                if (user_tickets.fetch(`${open}.open`) == true) {
                    return message.channel.send("The owner of this ticket currently has another ticket open.");
                }

                user_tickets.set(`${message.channel.id}.open`, true);
                user_tickets.set(`${user_tickets.fetch(`${message.channel.id}.owner`)}.current_channel_id`, message.channel.id);

                message.channel.edit({
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: user_tickets.fetch(`${message.channel.id}.owner`),
                            allow: ["VIEW_CHANNEL"]
                        },
                        {
                            id: client.user.id,
                            allow: ["MANAGE_CHANNELS", "VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "ADD_REACTIONS", "MANAGE_MESSAGES"]
                        },
                        {
                            id: "826924370210979851", // helper role ID
                            allow: ["VIEW_CHANNEL"]
                        }
                    ]
                });

                message.delete();

                message.channel.send("This ticket has been reopened.").then(msg => msg.delete({ timeout: 2000 }));
            } else {
                return;
            }
        } else if (args[0] == "delete") {
            if (message.channel.name.startsWith("ticket-")) {
                if (user_tickets.fetch(`${message.channel.id}.open`) != false) return message.channel.send("Please close this ticket before attempting to delete it.");
                user_tickets.set(`${user_tickets.fetch(`${message.channel.id}.owner`)}.current_channel_id`, message.channel.id);

                message.channel.edit({
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: user_tickets.fetch(`${message.channel.id}.owner`),
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: client.user.id,
                            allow: ["MANAGE_CHANNELS", "VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "ADD_REACTIONS", "MANAGE_MESSAGES"]
                        },
                        {
                            id: "826924370210979851", // helper role ID
                            allow: ["VIEW_CHANNEL"]
                        }
                    ]
                });

                message.channel.send("This ticket is being deleted.");
                message.delete();

                setTimeout(() => {
                    message.channel.delete();
                }, 5000);
            }
        } else if (args[0] == "setup") {
            if (message.member.hasPermission("MANAGE_GUILD")) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor(message.guild.name)
                    .setDescription("To open a ticket react with :ticket:")

                message.channel.send(embed).then(msg => {
                    user_tickets.set("msg_setup_id", msg.id);
                    // user_tickets.set("channel_setup_id", msg.channel.id);
                    msg.react("🎫");
                });
            }
        } else if (args[0] == "upgrade") {
            if (message.channel.name.startsWith("ticket-")) {
                message.channel.edit({
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: user_tickets.fetch(`${message.channel.id}.owner`),
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: client.user.id,
                            allow: ["MANAGE_CHANNELS", "VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "ADD_REACTIONS", "MANAGE_MESSAGES"]
                        },
                        {
                            id: "826924370210979851", // helper role ID
                            deny: ["VIEW_CHANNEL"]
                        }
                    ]
                });

                message.channel.send("This ticket has been upgraded at the request of the ticket owner.");
            }
        } else if (args[0] == "downgrade") {
            if (message.channel.name.startsWith("ticket-")) {
                message.channel.edit({
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: user_tickets.fetch(`${message.channel.id}.owner`),
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: client.user.id,
                            allow: ["MANAGE_CHANNELS", "VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "ADD_REACTIONS", "MANAGE_MESSAGES"]
                        },
                        {
                            id: "826924370210979851", // helper role ID
                            allow: ["VIEW_CHANNEL"]
                        }
                    ]
                });

                message.channel.send("This ticket has been downgraded at the request of the ticket owner.");
            }
        }
    }
}