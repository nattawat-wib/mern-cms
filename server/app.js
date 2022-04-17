const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());


const multer_storage = multer.memoryStorage();

const multer_filter = (req, file, cb) => {
    if(file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb(new AppError("No an image! please upload image"), true)
    }
}

const upload = multer({ 
    storage: multer_storage,
    fileFilter: multer_filter
});

const banner_upload = upload.single("banner");
const thumbnail_upload = upload.single("thumbnail");

app.post("/test-upload", banner_upload, (req, res) => {
    console.log(req.body);
    // console.log(req.file);
})

app.listen(8080, () => {
    console.log("server start at port 8080");
})