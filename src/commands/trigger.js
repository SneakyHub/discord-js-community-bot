const canvacord = require('canvacord');
const Discord = require('discord.js');
const client = new Discord.Client();
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: "trigger",
    description: "triggers", //Usage -trigger <@mention.user> otherwise it will use your avatar
    run: async(message, client, args) => {
        let user = message.mentions.users.first() || message.author;
        let avatar = user.displayAvatarURL({ format: "png", dynamic: false })
        let image = await canvacord.Canvas.trigger(avatar);
        let attachment = new Discord.MessageAttachment(image, "triggered.gif");
        return message.channel.send(attachment); // you can also embed but i didnt add embed :p because i noob
    }
}
