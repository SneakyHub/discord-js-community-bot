const Discord = require('discord.js');

module.exports = { 
	name: "server-info", 
	aliases: ["serverinfo"], 
run: async (client, message, args) => {

function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " day") + " ago";
        };
        let guild = message.channel.guild
        let serverSize = message.guild.memberCount;
        let botCount = message.guild.members.cache.filter(m => m.user.bot).size;
        let humanCount = serverSize - botCount;
        let verifLevels = ["Nothing", "Low", "Middle", "High", "Very High"];
	let region = {
			"us-central": "US Central :flag_us:",
			"us-east": "US East :flag_us:",
			"us-south": "US South :flag_us:",
			"us-west": "US West :flag_us:",
			"eu-west": "EU West :flag_eu:",
			"eu-central": "EU Central :flag_eu:",
			"singapore": "Singapore :flag_sg:",
			"london": "London :flag_gb:",
			"japan": "Japan :flag_jp:",
			"russia": "Russia :flag_ru:",
			"hongkong": "Hong Kong :flag_hk:",
			"brazil": "Brezil :flag_br:",
			"singapore": "Singapore :flag_sg:",
			"sydney": "Sydney :flag_au:",
			"southafrica": "South Africa :flag_za:",
                        "amsterdam": "Amsterdam :flag_nl:",
				"europe": "Europa :flag_eu:"

	}

	
			const editing = await message.channel.send(`Getting Server Information`);

let server = new Discord.MessageEmbed()
.setAuthor('Server Informatipn', message.guild.iconURL())
.setThumbnail(message.guild.iconURL())
.addField('Server Informations', `Server Name: **${guild.name}** \nServer ID: **${message.guild.id}** \nServer Owner: **${guild.owner}** \nRegion: **${region[message.guild.region]}** \nCreation Date: **${checkDays(message.guild.createdAt)}** 
`)
.addField(`User Informations `, `All User: **${humanCount}** \nBot Users: **${botCount}** \nRole Count:**${guild.roles.cache.size}**`)
.addField(`Channels`, ` Text: **${message.guild.channels.cache.filter(c => c.type === 'text').size}** \n Voice: **${message.guild.channels.cache.filter(c => c.type === 'voice').size}** \n Category: **${message.guild.channels.cache.filter(c => c.type === 'category').size}**`)
.setTimestamp()
.setColor('#D2EE07')
.setFooter('Server Information', message.guild.iconURL())
        return editing.edit('', server);
	
} 
   } 
	
