const Discord = require("discord.js");
const BotSettings = require("../../models/BotSettings")

module.exports = {
    name: "messageDelete",
    run: async (client, message) => {
        if (message.channel.parentID == "832604196054237184") return;

        let info = {
            id: null,
            token: null
        }

        await BotSettings.findOne({ key: "logWebhookInfo" }).then(document => {
            console.log(document)
            info.id = document.values.id
            info.token = document.values.token
        })

        const hook = new Discord.WebhookClient(info.id, info.token)

        if (message.attachments.cache.size != 0) {
            message.attachments.cache.forEach(attachment => {
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Attachment")
                    .setColor("RED")
                    .setImage(attachment.url)
                    .setURL(attachment.url)
                    .setTimestamp()

                hook.send(embed)
            })
        }

        let embed = new Discord.MessageEmbed()
            .setAuthor("Message Deleted")
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
                }
            )
            .setTimestamp()



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