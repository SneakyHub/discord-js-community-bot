
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "avatar",
    aliases: ["av"],
    description: "Displays someone's avatar!",
    run: async (client, message, args) => {
        const avatarEmbed = require('discord.js-avatar');

 

// Call the avatarEmbed method, only the first argument is required.

// language: Language in which the embedded message will be sent.
//TRUST ME THIS WORKS
avatarEmbed(message, language = 'english');
    }
}
