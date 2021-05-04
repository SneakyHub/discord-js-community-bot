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
    },
    messageCount: {
        required: false,
        type: String
    },
    enabledModules: {
        required: false,
        type: Array
    }
})

module.exports = Mongoose.model("guild", GuildSchema)