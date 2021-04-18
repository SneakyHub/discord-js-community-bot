const Discord = require("discord.js");
const webhook = {
    token: "XPRN4_kSCSILR2YQmRymQeWvPfhCkUqOnyLYm2ahMH50ghGVRpklwwDyu1cnIwVTQO8y",
    id: "826519427121807361"
};

module.exports = {
    name: "messageDelete",
    run: async (client, message) => {
        let embed = new Discord.MessageEmbed()
            .setTitle("Message Deleted")
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