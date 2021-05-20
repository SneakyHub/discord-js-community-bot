const Discord = require("discord.js");
const CurrencySystem = require("currency-system");

    const cs = new CurrencySystem;

module.exports = {

    name: "work",

    aliases: ["work", "getMoney"],

    run: async (client, message, args) => {

           let result = await cs.work({

        user: message.author,

        guild: message.guild,

        maxAmount: 100,//The max amount of moneyy you get when you work! 

        replies: ['Programmer', 'Developer', 'Builder', 'Waiter', 'Busboy', 'Chief', 'Mechanic'],//random message from these, example: you worked as a developer and earned $75!

        cooldown: 25 //in seconds

    });

    message.channel.send(result); //Send the result

    }

}//DO NOT EDIT UNLESS YOU KNOW WHAT YOU'RE DOING
