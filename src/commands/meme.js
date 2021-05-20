const got = require('got');

const Discord = require('discord.js');

module.exports = {
    name: "meme",
    aliases: [],
    run: async (bot, message, args) => {
        const embed = new Discord.MessageEmbed();

    got('https://www.reddit.com/r/dankmemes/random/.json').then(response => {

        let content = JSON.parse(response.body);

        let permalink = content[0].data.children[0].data.permalink;

        let memeUrl = `https://reddit.com${permalink}`;

        let memeImage = content[0].data.children[0].data.url;

        let memeTitle = content[0].data.children[0].data.title;

        let memeUpvotes = content[0].data.children[0].data.ups;

        

        let memeNumComments = content[0].data.children[0].data.num_comments;

        embed.addField(`${memeTitle}`, `[View thread](${memeUrl})`);

        embed.setImage(memeImage);

        embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);

        message.channel.send(embed)

            .then(sent => console.log(`Sent a reply to ${sent.author.username}`))

        console.log('Bot responded with: ' + memeImage);

    }).catch(console.error);

    
    } 

