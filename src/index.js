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

LoadCommands.run(client, "../commands"); // loads in all the commands
LoadEvents.run(client, "../events"); // loads in all the events

client.login(config.token); // logs into the bot