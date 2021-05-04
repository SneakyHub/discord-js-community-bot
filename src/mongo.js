const Mongoose = require("mongoose");

module.exports = async () => {
    Mongoose.connect(require("../config").mongodb_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        keepAlive: true
    });

    return Mongoose;
}