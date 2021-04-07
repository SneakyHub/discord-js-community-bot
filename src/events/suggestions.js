const Discord = require("discord.js");

module.exports = {
    name: "message",
    run: async (client, message, args) => {
        if (message.channel.id != "826165658541752390") return;
        if (message.author.bot) return;

        const { content, author, createdTimestamp } = message;

        const embed = new Discord.MessageEmbed()
            .setAuthor(author.tag)
            .setTitle("New Suggestion")
            .setDescription(content)
            .setTimestamp(createdTimestamp)

        let msg = await message.channel.send(embed);

        msg.react("👍");
        msg.react("👎");

        message.delete();
    }
}