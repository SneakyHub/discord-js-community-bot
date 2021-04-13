const Discord = require('discord.js'); 
const db = require('coders.db');
const fs = require('fs');

module.exports = {
    name: "forceban",
    aliases: ["forceban"],
    run: async (client, message, args) => {
var n = client.emojis.cache.get("no emoji id") || "❌"
    var y = client.emojis.cache.get("yes emoji id") || "☑️"
    // TODO: Don't Touch Here
    var control;
    var uid = args[0]
    var rsn = args.slice(1).join(' ') || "No Reason"
    // -------------- //  
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`${n} You dont have enough permission`);
  if(!uid) return message.reply(`${n} mention a member.`)
    control = db.get(`fcban_${message.guild.id}-${uid}`)
 if(control===1) return message.reply(`${n} This member already banned.`)
    /*          END FUNCTION               */
    
       
            if (message.guild.member(uid)) message.guild.member(uid).ban({ reason: rsn })
            db.set(`fcban_${message.guild.id}-${uid}`, 1)
            message.reply(`${y} Member successfully force banned.`)
};
