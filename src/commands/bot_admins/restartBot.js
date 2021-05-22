module.exports = {
    name: "restart-bot",
    aliases: [],
    run: async (client, message, args) => {
        if (message.author.id != "716761186812821604") return

        message.channel.send("Restarting the bot...")

        setTimeout(() => {
            process.exit()
        }, 2000)
    }
}