const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mern-cms")
.then(() => console.log("DB connection successfully"))
.catch(err => console.log(`DB connection ERROR: ${err}`))