const Mongoose = require("mongoose")

const SuggestionSchema = new Mongoose.Schema({
    suggestionId: {
        required: true,
        type: String
    },
    guildId: {
        required: false,
        type: String
    },
    content: {
        required: false,
        type: String
    },
    repliedTo: {
        required: false,
        type: Boolean
    }
})

module.exports = Mongoose.model("suggestion", SuggestionSchema)