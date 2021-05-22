const Discord = require("discord.js");
const suggestion = require("../../models/Suggestion")

module.exports = {
    name: "message",
    run: async (client, message) => {
        if (message.channel.id != "826165658541752390") return;
        if (message.author.bot) return;

        const { content, author, createdTimestamp } = message;
        let colors = ["BLUE", "RED", "YELLOW", "ORANGE", "PURPLE", "GREEN"];
        let index = Math.floor(Math.random() * (colors.length - 1) + 1);
        let suggestionId = await createId()

        const embed = new Discord.MessageEmbed()
            .setAuthor(author.tag)
            .setTitle("New Suggestion")
            .setColor(colors[index])
            .setDescription(content)
            .setTimestamp(createdTimestamp)
            .setFooter(suggestionId)

        let msg = await message.channel.send(embed);


        new suggestion({
            suggestionId: suggestionId,
            guildId: message.guild.id,
            content: message.content,
            messageId: message.id,
            channelId: message.channel.id,
            authorId: message.author.id,
            createdTimestamp: message.createdTimestamp,
            repliedTo: false
        }).save()

        msg.react("👍");
        msg.react("👎");

        message.delete();
    }
}

function createId() {
    let length = 9 // the amount of characters you want to be in the ID
    let root = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwzyx1234567890" // the thing that makes up the ID
    let id = ""

    while (id.length < length) {
        id += root[Math.floor(Math.random() * root.length)]
    }

    return id
}