const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config");
const LoadCommands = require("./utils/LoadCommands");
const LoadEvents = require("./utils/LoadEvents");

client.commands = new Discord.Collection();
client.snipes = new Map();

LoadCommands(client, "../commands");
LoadEvents(client, "../events");

/////Commands//////

client.on("guildMemberAdd", async (message) => {
    var control;
    control = db.get(`fcban_${message.guild.id}-${message.user.id}`)
    control === 1 ? message.guild.member(message).ban() : false;
})

client.login(config.token);
