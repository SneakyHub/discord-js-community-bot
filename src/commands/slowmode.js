const Discord = require("discord.js");

module.exports = {
    name: "slowmode",
    aliases: [],
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return;

        if (!args[0]) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag)
                .setTitle("Channel Slowmode")
                .addFields(
                    {
                        name: "Current Slowmode",
                        value: `${message.channel.rateLimitPerUser}`
                    }
                )
                .setFooter("`?slowmode <slowmode in seconds>` to set the channel slowmode.")

            message.channel.send(embed);
        } else if (args[0]) {
            message.channel.setRateLimitPerUser(parseInt(args[0]));

            message.channel.send("Channel slowmode has been changed.");
        }
    }
}