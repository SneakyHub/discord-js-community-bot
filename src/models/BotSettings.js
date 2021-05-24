const Mongoose = require("mongoose")

const Schema = new Mongoose.Schema() // No defined schema since this can be really anything you want

module.exports = Mongoose.model("bot_settings", Schema)