const Util = require("util");
const Discord = require("discord.js");
const config = require("../../config");

module.exports = {
    name: "eval",
    aliases: ["evaluate"],
    run: async (client, message, args) => {
        if (!config.eval_ids.includes(message.author.id)) {
            return;
        }

        try {
            let evaled;
            try {
                evaled = await eval(args.join(" "));

                const embed = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag)
                    .setTitle("Evaluation")
                    .addField("Input", `${args.join(" ")}`)
                    .addField("Output", `${evaled}`);


                message.channel.send(embed);
            } catch (error) {
                console.error(error);
                message.channel.send(`**Error**: ${error.message}`);
            }
        } catch (err) {
            console.error(err);
        }
    }
}