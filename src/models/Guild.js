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
        type: String,
        default: "!"
    },
    messageCount: {
        required: false,
        type: String,
        default: 0
    },
    enabledModules: {
        required: false,
        type: Array,
        default: []
    }
})

module.exports = Mongoose.model("guild", GuildSchema)