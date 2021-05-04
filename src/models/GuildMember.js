const Mongoose = require("mongoose")

const GuildMemberSchema = new Mongoose.Schema({
    userId: {
        required: true,
        type: String
    },
    guildId: {
        required: true,
        type: String
    },
    userName: {
        required: false,
        type: String
    },
    guildName: {
        required: false,
        type: String
    },
    messageCount: {
        required: false,
        type: Number
    }
})

module.exports = Mongoose.model("guild_member", GuildMemberSchema)