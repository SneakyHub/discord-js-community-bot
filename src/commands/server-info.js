const Discord = require('discord.js');

module.exports = {
    name: "server-info",
    aliases: ["serverinfo"],
    run: async (client, message, args) => {

        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " days" : " days") + " ago";
        }

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
            "brazil": "Brazil :flag_br:",
            "singapore": "Singapore :flag_sg:",
            "sydney": "Sydney :flag_au:",
            "southafrica": "South Africa :flag_za:",
            "amsterdam": "Amsterdam :flag_nl:",
            "europe": "Europe :flag_eu:"

        }

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag)
            .setThumbnail(message.guild.iconURL())
            .addField("Server Information", `Server Name: ${message.guild.name}\nServer ID: ${message.guild.id}\nServer Owner: ${message.guild.owner}\nRegion: ${region[message.guild.region]}\nCreation Date: ${checkDays(message.guild.createdAt)}`)
            .addField("User Information", `All User: ${humanCount} \nBot Users: ${botCount} \nRole Count:${message.guild.roles.cache.size}`)
            .addField("Channels", `Text: ${message.guild.channels.cache.filter(c => c.type === 'text').size}\nVoice: ${message.guild.channels.cache.filter(c => c.type === 'voice').size}\nCategory: ${message.guild.channels.cache.filter(c => c.type === 'category').size}`)

        return message.channel.send(embed);
    }
}