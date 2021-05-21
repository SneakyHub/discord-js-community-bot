const Discord = require("discord.js");
const webhook = {
    token: "P6Nx4CqAVL9cnNOqSXgbSd3YP75SZEydDFhxhJTmqS7HjlkjkLrlZ_fajGV8PgFYpf6P",
    id: "833393130208100432"
};

module.exports = {
    name: "messageDelete",
    run: async (client, message) => {
        if (message.channel.parentID == "832604196054237184") return;

        let deleted = "";

        message.guild.fetchAuditLogs({ type: "MESSAGE_DELETE", limit: 10, user: message.author }).then(audit => {
            deleted = `${audit.entries.last().executor} (\`${audit.entries.last().executor.id}\`)`;
        }).catch(e => {

        });

        let embed = new Discord.MessageEmbed()
            .setTitle("Message Deleted")
            .setColor("RED")
            .addFields(
                {
                    name: "Content",
                    value: message.content,
                    inline: true
                },
                {
                    name: "Channel",
                    value: message.channel,
                    inline: true
                },
                {
                    name: "Author",
                    value: message.author,
                    inline: true
                },
                {
                    name: "Deleted By",
                    value: deleted.toString() || "null",
                    inline: true
                }
            )

        const hook = new Discord.WebhookClient(webhook.id, webhook.token);

        hook.send(embed);

        let snipes = client.snipes;

        snipes.set(`${message.guild.id}:${message.channel.id}`, {
            message_id: message.id,
            message_author_id: message.author.id,
            message_author_tag: message.author.tag,
            message_created_timestamp: message.createdTimestamp,
            message_content: message.content
        });

        setTimeout(() => {
            if (snipes.get(`${message.guild.id}:${message.channel.id}`).message_created_timestamp == message.createdTimestamp) {
                snipes.delete(`${message.guild.id}:${message.channel.id}`);
            }
        }, 300000);
    }
}