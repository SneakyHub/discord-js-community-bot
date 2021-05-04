const Discord = require("discord.js")
const config = require("../../config")
const cooldowns = new Discord.Collection()

module.exports = {
    name: "message",
    run: async (client, message) => {
        if (message.mentions.has(client.user)) {
            return message.channel.send(`My prefix is: \`${config.prefix}\``)
        }

        if (!message.content.startsWith(config.prefix || `<@!${client.user.id}>`)) return
        if (message.author.bot) return
        if (message.channel.type == "dm") return

        const args = message.content.slice(config.prefix.length).trim().split(/ +/)
        const command = args.shift().toLowerCase()

        if (client.commands.has(command)) {
            if (cooldowns.has(message.author.id)) {
                return message.reply("please wait for the command cooldown to end before attempting to run a command.")
            } else {
                client.commands.get(command).run(client, message, args)

                let array = []

                message.member.roles.cache.forEach(role => {
                    if (array.includes(role.id)) return
                    array.push(role.id)
                })

                if (array.includes("826924370210979851") || array.includes("828319282068324382") || array.includes("825702803355467806") || array.includes("826022948087005244")) {
                    return
                } else {
                    cooldowns.set(message.author.id, 1)
                }

                setTimeout(() => {
                    cooldowns.delete(message.author.id)
                }, 2500);
            }
        }
    }
}