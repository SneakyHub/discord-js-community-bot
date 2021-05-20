const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "dog",
    category: "animals",
    run: async(message, client, args) => {
        const url = "https://some-random-api.ml/img/dog";
        const facts = "https://some-random-api.ml/facts/dog"

        let image, response;
        let fact, responses;
        try {
            response = await axios.get(url);
            image = response.data;

            responses = await axios.get(facts)
            fact = responses.data

        } catch (e) {
            return message.channel.send(`An error occured, please try again!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`Random Dog Image and Fact`)
            .setColor(`#f3f3f3`)
            .setDescription(fact.fact)
            .setImage(image.link)

            message.channel.send(embed).catch(err => console.log(err));
    }
}
