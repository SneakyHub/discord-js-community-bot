const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config");
const LoadCommands = require("./utils/LoadCommands");
const LoadEvents = require("./utils/LoadEvents");
const CurrencySystem = require("currency-system");

const cs = new CurrencySystem;

cs.connect(process.env.mongoDB);

client.on("ready", () => {
  client.editSnipes = new discord.Collection();//i forgot
});

client.on("messageUpdate", async(m, nm) => { //m = old mesage, nm = new message
  if (m.author.bot) return; //bot can't run commands
  if (!client.editSnipes.get(m.channel.id)) client.editSnipes.set(m.channel.id, []); //if there are no snipes, turn it to an empty array
  const editSnipes = client.editSnipes.get(m.channel.id); //the array of edit snipes in the current channel
  const obj = { m, nm, editedAt: Date.now() }; // an object containing both the old and new messages
  client.editSnipes.set(m.channel.id, editSnipes.concat([obj])); //save it to client.editSnipes
});

client.commands = new Discord.Collection();
client.snipes = new Map();
client.antispam = new Map();
client.userCache = new Discord.Collection();

LoadCommands(client, "../commands");
LoadEvents(client, "../events");

client.login(config.token);
