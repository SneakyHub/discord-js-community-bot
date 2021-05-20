const Discord = require("discord.js");

const CurrencySystem = require("currency-system");

    const cs = new CurrencySystem;

module.exports = {

    name: "bal",

    aliases: ["balance", "b"],

    run: async (client, message, args) => {

            let user;

    if (message.mentions.users.first()) {

        user = message.mentions.users.first();

    } else if (args[0]) {

        user = message.guild.members.cache.get(args[0]).user;

    } else if (!args[0]) {

        user = message.author;

    }

    let result = await cs.balance({

        user: user,

        guild: message.guild

    });

    message.channel.send(`${user.tag}, \n have $${result.wallet} in you wallet and $${result.bank} in there bank.`);



    }

} //DO NOT EDIT UNLESS YOU KNOW WHAT YOU ARE DOIND
