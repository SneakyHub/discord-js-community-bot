const Mongoose = require("mongoose")

const GuildSchema = new Mongoose.Schema({
    guildId: {
        required: true,
        type: String
    },
    guildName: {
        required: false,
        type: String
    },
    prefix: {
        required: false,
        type: String
    }
})

module.exports = Mongoose.model("guild", GuildSchema)