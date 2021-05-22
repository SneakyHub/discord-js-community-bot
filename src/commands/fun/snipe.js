const HD = require("humanize-duration");
const Discord = require("discord.js");

module.exports = {
    name: "snipe",
    aliases: [],
    run: async (client, message, args) => {
        let snipes = client.snipes;
        let snipe = snipes.get(`${message.guild.id}:${message.channel.id}`);

        if (!snipe || snipe == null) {
            return message.channel.send("There is nothing to snipe in this channel.");
        }

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag)
            .setTitle(snipe.message_author_tag)
            .setDescription(snipe.message_content)
            .setFooter(`Message Deleted ${HD(Date.now() - snipe.message_created_timestamp)} ago`)

        message.channel.send(embed);
    }
}
