const Discord = require("discord.js");

module.exports = {
    name: "help",
    aliases: [],
    run: async (client, message, args) => {
        if (!args[0]) {
            let CommandsArray = [];

            client.commands.forEach(cmd => {
                if (CommandsArray.includes(cmd.name)) return;
                CommandsArray.push(cmd.name)
            });

            const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag)
                .setTitle("Help Menu")
                .addField("Command List", `${CommandsArray.toString()}`)

            message.channel.send(embed);
        } else {
            let cmd = client.commands.get(args[0]);

            const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag)
                .setTitle("Command Help Menu")
                .addField("Aliases", `${cmd.aliases.toString() || "None"}`)

            message.channel.send(embed);
        }
    }
}