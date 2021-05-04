const Mongoose = require("mongoose")

const UserSchema = new Mongoose.Schema({
    userId: {
        required: true,
        type: String
    },
    userTag: {
        required: false,
        type: String
    },
    guilds: {
        required: false,
        type: Array
    }
})

module.exports = Mongoose.model("user", UserSchema)