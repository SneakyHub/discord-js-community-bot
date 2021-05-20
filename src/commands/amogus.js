const Canvas = require('canvas');

const { Client, Message, MessageAttachment } = require('discord.js');





module.exports = {

    name: "amogus",

    aliases: ["amogUS", "sus"],

    run: async (client, message, args) => {
      const member = message.mentions.members.first() || message.member;

	const canvas = Canvas.createCanvas(867, 892);

	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://i.imgur.com/OopLtL2.jpeg');

	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));

	ctx.drawImage(avatar, 350, 350, 300, 300);

	const attachment = new MessageAttachment(canvas.toBuffer(), `amogus${member.user.username}.jpg`);

	message.reply({ files: [attachment], allowedMentions: { repliedUser: false } });

}
 } 
