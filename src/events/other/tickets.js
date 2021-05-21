const Discord = require("discord.js");
const db = require("quick.db");
const user_tickets = new db.table("user_tickets");

module.exports = {
    name: "messageReactionAdd",
    run: async (client, reaction, user) => {
        if (reaction.message.id != user_tickets.fetch("msg_setup_id")) return;
        if (user.bot) return;

        reaction.message.reactions.resolve("🎫").users.remove(user.id);

        if (user_tickets.has(`${user.id}_blacklisted`)) return

        let channel = user_tickets.fetch(`${user.id}.current_channel_id`);

        if (client.channels.cache.has(channel)) {
            if (user_tickets.fetch(`${channel}.open`) == false) {
                user_tickets.add("amount_of_tickets", 1);
                let guild = reaction.message.guild;
                let channel = await guild.channels.create(`ticket-${user_tickets.fetch("amount_of_tickets")}`, {
                    type: "text",
                    permissionOverwrites: [
                        {
                            id: guild.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: user.id,
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
                    ],
                    parent: "832604196054237184"
                });

                user_tickets.set(`${user.id}`, {
                    current_channel_id: channel.id
                });

                user_tickets.set(`${channel.id}`, {
                    owner: user.id,
                    open: true
                });

                const embed = new Discord.MessageEmbed()
                    .setTitle("Ticket")
                    .setColor("GREEN")
                    .setDescription(`
                Please provide as much information as possible relating to the problem.
                
                To close this ticket send \`?ticket close\`
                To reopen this ticket send \`?ticket reopen\`
                To delete this ticket send \`?ticket delete\`
                To upgrade this ticket send \`?ticket upgrade\`
                To downgrade this ticket send \`?ticket downgrade\`

                Please give us the following details so we can better help you with the issue:
                - issue
                - how to reproduce
                - expected behavior
                - more details

                Do not share any personal or private account information within tickets, if you need help with your account then send \`?ticket upgrade\`.
                `)

                channel.send(`${user}`, embed);
            } else {
                const embed = new Discord.MessageEmbed()
                    .setTitle("Ticket")
                    .setColor("GREEN")
                    .setDescription(`
                Please provide as much information as possible relating to the problem.
                
                To close this ticket send \`?ticket close\`
                To reopen this ticket send \`?ticket reopen\`
                To delete this ticket send \`?ticket delete\`
                To upgrade this ticket send \`?ticket upgrade\`
                To downgrade this ticket send \`?ticket downgrade\`

                Please give us the following details so we can better help you with the issue:
                - issue
                - how to reproduce
                - expected behavior
                - more details

                Do not share any personal or private account information within tickets, if you need help with your account then send \`?ticket upgrade\`.
                `)

                client.channels.cache.get(channel).send(`${user}`, embed);
            }
        } else {
            user_tickets.add("amount_of_tickets", 1);
            let guild = reaction.message.guild;
            let channel = await guild.channels.create(`ticket-${user_tickets.fetch("amount_of_tickets")}`, {
                type: "text",
                permissionOverwrites: [
                    {
                        id: guild.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: user.id,
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
                ],
                parent: "832604196054237184"
            });

            user_tickets.set(`${user.id}`, {
                current_channel_id: channel.id
            });

            user_tickets.set(`${channel.id}`, {
                owner: user.id,
                open: true
            });

            const embed = new Discord.MessageEmbed()
                .setTitle("Ticket")
                .setColor("GREEN")
                .setDescription(`
            Please provide as much information as possible relating to the problem.
                
            To close this ticket send \`?ticket close\`
            To reopen this ticket send \`?ticket reopen\`
            To delete this ticket send \`?ticket delete\`
            To upgrade this ticket send \`?ticket upgrade\`
            To downgrade this ticket send \`?ticket downgrade\`

            Please give us the following details so we can better help you with the issue:
            - issue
            - how to reproduce
            - expected behavior
            - more details

            Do not share any personal or private account information within tickets, if you need help with your account then send \`?ticket upgrade\`.
            `)

            channel.send(`${user}`, embed);
        }
    }
}