const Discord = require("discord.js");

module.exports = {
    name: "8ball",
    aliases: [],
    run: async (client, message, args) => {
        let responses = [
            "Yes.",
            "No.",
            "Definitely.",
            "Definitely not.",
            "Nope.",
            "Yep.",
            "Ask again later.",
            "Why are you asking me?",
            "Concentrate and ask again.",
            "Bruh, you wish."
        ];
        let question = args.join(" ");

        if (!question) return message.reply("I think you forgot to ask the question...");

        let index = Math.floor(Math.random() * (responses.length - 1) + 1);

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag)
            .setTitle("8-Ball")
            .setDescription(question)
            .addField("Answer", `${responses[index]}`)

        message.channel.send(embed);
    }
}