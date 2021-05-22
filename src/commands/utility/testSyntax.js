const convertSyntax = require("../../utils/ConvertSyntax")

module.exports = {
    name: "test-syntax",
    aliases: [],
    run: async (client, message, args) => {
        let user = message.author
        let guild = message.guild
        let text = message.content.replace("?text-syntax", "")

        let newText = convertSyntax.run(client, text, { user, guild })

        message.channel.send(newText)
    }
}