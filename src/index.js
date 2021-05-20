const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config");
const LoadCommands = require("./utils/LoadCommands");
const LoadEvents = require("./utils/LoadEvents");
const db = require("quick.db");

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

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.author.id === message.client.user.id) return;
    if (message.channel.type === "dm" || !message.guild) return;
    db.add(`messages_${message.guild.id}_${message.author.id}`, 1)
})


client.on('message', async message => {
    if (message.author.bot) return;
    if (message.author.id === message.client.user.id) return;
    if (message.channel.type === "dm" || !message.guild) return;
    let user = message.author; 
    let messages = db.fetch(`messages_${message.guild.id}_${user.id}`)
    let role1 = message.guild.roles.cache.get("831763157856944128");
    let role2 = message.guild.roles.cache.get("831763157856944128");
    let role3 = message.guild.roles.cache.get("831763157856944128");
    let role4 = message.guild.roles.cache.get("831763157856944128");
    let role5 = message.guild.roles.cache.get("831763157856944128");

    if(messages > 250) { message.guild.member(user).roles.add(role1) }

    else if(messages > 500) { message.guild.member(user).roles.add(role2) }

    else if(messages > 1000) { message.guild.member(user).roles.add(role3) }

    else if(messages > 2500) { message.guild.member(user).roles.add(role4) }

    else if(messages > 5000) { message.guild.member(user).roles.add(role5) }
})

//Message Tracking System 
//Need to change the Role IDs
//To make a Messages Command:
//db.fetch(`messages_${message.guild.id}_${message.author.id}`)

client.login(config.token);
