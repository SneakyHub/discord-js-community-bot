const Discord = require("discord.js");

module.exports = {
    name: "messageDelete",
    run: async (client, message) => {
        if (message.channel.parentID == "832604196054237184") return;

        let logchannel = "826519397912805377" // this is temporary

        let channel = message.guild.channels.cache.get(logchannel) // also temporary

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

        channel.send(embed);

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