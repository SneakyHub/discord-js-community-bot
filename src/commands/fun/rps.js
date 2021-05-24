const Discord = require('discord.js')
module.exports = {
	name: "rps",
	description: "play a game of rock, paper and scissors",
	run: async(message, args) => {
    
		let embed = new Discord.MessageEmbed() // Embeds
		.setTitle("RPS GAME")
		.setDescription("React to play!")
		.setTimestamp()
    .setColor('RANDOM')
    .setFooter(message.author.username,  message.author.displayAvatarURL({ dynamic: true }));
    
    
		let msg = await message.channel.send(embed) // The reactions , you can change it.
		await msg.react("🗻")
		await msg.react("✂")
		await msg.react("📰")

		const filter = (reaction, user) => {
            return ['🗻', '✂', '📰'].includes(reaction.emoji.name) && user.id === message.author.id;
        }

        const choices = ['🗻', '✂', '📰']
        const me = choices[Math.floor(Math.random() * choices.length)]
        msg.awaitReactions(filter, {max:1, time: 60000, error: ["time"]}).then(
        	async(collected) => {
        		const reaction = collected.first()
            
        		let result = new Discord.MessageEmbed() //the embed after bot chooses its choice
        		.setTitle("RESULT")
        		.addField("Your choice", `${reaction.emoji.name}`)
        		.addField("My choice", `${me}`)
				    .setColor('RANDOM')
				    .setTimestamp()
				    .setFooter(message.author.username,  message.author.displayAvatarURL({ dynamic: true }));
            
            
			await msg.edit(result)
        		if ((me === "🗻" && reaction.emoji.name === "✂") ||
                (me === "📰" && reaction.emoji.name === "🗻") ||
                (me === "✂" && reaction.emoji.name === "📰")) {
                    message.reply("You lost!");
            } else if (me === reaction.emoji.name) {
                return message.reply("It's a tie!");
            } else {
                return message.reply("You won!");
            }
        })
        .catch(collected => {
                message.reply('Process has been cancelled since you did not respond in time!');
            })
}
}
