require("./mongo")()

const Discord = require("discord.js");
const client = new Discord.Client();
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

LoadCommands(client, "../commands");
LoadEvents(client, "../events");

client.login(config.token);