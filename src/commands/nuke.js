const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "nuke",
    description: "Nukes a given channel",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return

        let reason = args.join(" ") || "No Reason"
        if (!message.channel.deletable) {
            return message.reply("This channel cannot be nuked!")
        }
        let newchannel = await message.channel.clone()
        await message.channel.delete()
        let embed = new MessageEmbed()
            .setTitle("Channel Nuked")
            .setDescription(reason)
            .setColor('RANDOM')
            .setImage('https://media0.giphy.com/media/oe33xf3B50fsc/200.gif')
            .setTimestamp()
        await newchannel.send(embed)
    }
}
