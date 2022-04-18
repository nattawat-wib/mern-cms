const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

const upload = multer({ 
    dest: "./uploads"
});

app.post("/test-upload", upload.single("banner"), (req, res) => {
    console.log(JSON.parse(req.body.article));
    console.log(req.file);

    
})

app.listen(8080, () => {
    console.log("server start at port 8080");
})