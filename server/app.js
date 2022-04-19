const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");

const articleRouter = require("./routes/articleRoute");

// connect DB
require("./db/mongoose");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use("/article", articleRouter)

app.listen(8080, () => {
    console.log("server start at port 8080");
})