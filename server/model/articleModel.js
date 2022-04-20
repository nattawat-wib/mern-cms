const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
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
})

articleSchema.pre("save", function(next) {    
    this.url = this.url.trim().toLowerCase().split(" ").join("-")
    next()
})

module.exports = mongoose.model("article", articleSchema)