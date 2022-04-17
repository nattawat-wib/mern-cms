const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use(cors());

console.log("req.body");
app.post("/test-upload", (req, res)  => {
    console.log(req.body);
    console.log(req.file);
})

app.listen(8080, () => {
    console.log("server start at port 8080");
})