module.exports = {
    name: "messageDelete",
    run: async (client, message) => {
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