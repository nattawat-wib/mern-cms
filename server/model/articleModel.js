const mongoose = require("mongoose");

module.exports = mongoose.model("article", new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    desc: {
        required: true,
        type: String
    },
    url: {
        required: true,
        type: String
    },
    banner: {
        required: true,
        type: String
    }
}))