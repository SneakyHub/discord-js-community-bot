const Discord = require("discord.js")

module.exports = {
    name: "message",
    disabled: true,
    run: async (client, message) => {
        if (message.channel.id != "828253375387795486") return
        if (message.author.bot) return

        if (message.content.includes("discord.js")) {
            message.channel.send(`
            Hey SneakyHub supports that! If you'd like to create a Discord.JS server then go into <#827164898336440321> and do \`sh!create server 1\`!

        **Discord.JS Installation**
        \`npm i discord.js\`

        **Discord.JS Documentation**
        https://discord.js.org/#/docs/main/stable/general/welcome
            `)
        } else if (message.content.includes("help")) {
            message.channel.send(`
            Need help? Put the problem here and wait for a staff member or someone else to help you!

        **Do not interrupt staff when they are attempting to help someone, you can and will be muted for this...**
            `)
        }
    }
}