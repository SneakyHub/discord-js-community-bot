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
    },
    moderations: {
        warnings: {
            required: false,
            type: Number,
            default: 0
        },
        mutes: {
            required: false,
            type: Number,
            default: 0
        },
        kicks: {
            required: false,
            type: Number,
            default: 0
        },
        bans: {
            required: false,
            type: Number,
            default: 0
        }
    }
})

module.exports = Mongoose.model("guild_member", GuildMemberSchema)