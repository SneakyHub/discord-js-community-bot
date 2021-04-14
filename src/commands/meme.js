const Discord = require("discord.js");
const axios = require("axios").default;
const cheerio = require("cheerio");
const urls = [
    "r/dankmemes",
    "r/memes",
    "r/meme",
    "r/memeeconomy",
    "r/OTMemes",
    "r/sequelmemes",
    "r/historymemes"
];

module.exports = {
    name: "meme",
    aliases: [],
    run: async (client, message, args) => {
        let msg = await message.channel.send("Fetching meme...");
        let index = Math.floor(Math.random() * (urls.length - 1) + 1);
        let url = `https://reddit.com/${urls[index]}`;

        axios({
            method: "GET",
            url: `${url}`
        }).then(response => {
            let parseData = dealWithData(response.data);

            const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag)
                .setImage(parseData)

            return msg.edit("", embed);
        });
    }
}

function dealWithData(html) {
    const $ = cheerio.load(html);
    const urlMeme = $("._2_tDEnGMLxpM6uOa2kaDB3.ImageBox-image.media-element._1XWObl-3b9tPy64oaG6fax");
    const indexValue = randNo(urlMeme.length);
    return urlMeme[indexValue].attribs.src;
}

function randNo(limit) {
    const thatNo = Math.floor(Math.random() * limit);
    return thatNo;
}