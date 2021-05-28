require("./mongo")() // connects the bot to the MongoDB

const Discord = require("discord.js");
const client = new Discord.Client(); // creates a client
const config = require("../config");
const LoadCommands = require("./utils/LoadCommands");
const LoadEvents = require("./utils/LoadEvents");

client.commands = new Discord.Collection();
client.snipes = new Map();
client.antispam = new Map();
client.userCache = new Discord.Collection();
client.invites = {}
client.userInvites = new Map()
client.editSnipes = new Discord.Collection()
client.sendErrorEmbed = async (message, text) => {
    const errorEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag)
        .setTitle(":x: Error!")
        .setColor("RED")
        .setThumbnail(message.guild.iconURL())
        .setDescription(text)
        .setFooter("Powered by SneakyHub")

    return message.channel.send(errorEmbed)
}
client.sendEmbed = async (message, data) => {
    if (!message) return Error("Insufficient parameters: message")
    if (!data) return Error("Insufficient parameters: data")
    if (!data.color || data.color == null) color = "RANDOM"
    if (!data.title || data.title == null) return Error("You must provide a title for this embed.")
    if (!data.description || data.description == null) return Error("You must provide a description for this embed.")

    const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag)
        .setTitle(data.title)
        .setColor(data.color)
        .setThumbnail(message.guild.iconURL())
        .setDescription(data.description)
        .setFooter("Powered by SneakyHub")

    return message.channel.send(embed)
}

LoadCommands.run(client, "../commands"); // loads in all the commands
LoadEvents.run(client, "../events"); // loads in all the events

client.login(config.token); // logs into the bot