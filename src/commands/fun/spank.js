const canvacord = require('canvacord');
const Discord = require('discord.js');
const client = new Discord.Client();
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: "spank",
    description: "spank", //Usage -spank <@mention.user> otherwise it will send nothing. Add Embed to it if you want.
    run: async(message, args) => {
        let user = message.mentions.users.first(); //|| message.author;
        let avatar = message.author.displayAvatarURL({ format: "png", dynamic: false })
        let avatar1 = user.displayAvatarURL({ format: "png", dynamic: false })
        let image = await canvacord.Canvas.spank(avatar, avatar1);
        let attachment = new Discord.MessageAttachment(image, "spank.png");
        return message.channel.send(attachment);
    }
}
