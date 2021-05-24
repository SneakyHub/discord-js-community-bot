const Discord = require("discord.js")

module.exports = {
    name: "editsnipe",
    aliases: ['esnipe'],
    disabled: true,
    run: async (client, message, args) => {
        const ers = new Discord.MessageEmbed()
            .setColor('RED')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({
                dynamic: true,
                size: 4096,
            }))
            .setDescription('There is no edited message in this channel!');
        const editSnipes = client.editSnipes.get(message.channel.id); //the editSnipes we saved to the client earlier
        if (!editSnipes) return message.channel.send(ers); //send a message if there are no edit-sniped messages
        const newArgs = message.content.slice(7/* Prefix/Command length */).trim().split(/ +/);
        const num = newArgs[0] || 1; //the index of the snipe message, defaults to 1 (the latest)
        const editSnipe = (editSnipes.reverse())[num - 1]; //the editSnipe user requested, may be a bit complicating for you
        if (!editSnipe) return message.channel.send(`No edited message with number ${num} found`); //send a message if no edit-snipe indexed by what the user ent
        const e = new Discord.MessageEmbed()
            .setAuthor(`${editSnipe.oldMessage.author.tag} (${editSnipe.oldMessage.author.id})`, editSnipe.oldMessage.author.avatarURL({ dynamic: 1 }))
            .setDescription(editSnipe.oldMessage.content || "null")
            .setColor("RANDOM")
            .setFooter(`${num}/${editSnipes.length}`)
            .setTimestamp(editSnipe.editedAt);
        if (editSnipe.oldMessage.attachments.first()) e.setImage(editSnipe.oldMessage.attachments.first().url); //the user cant edit or add attachments onto an edited message, so this works
        editSnipes.reverse();

        message.channel.send({ embed: e });
    }
}