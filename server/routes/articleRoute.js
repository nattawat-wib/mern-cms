const express = require("express");
const router = express.Router();
const articleController = require("../controller/articleController");
const multer = require("multer");
const upload = multer({  dest: "./../client/public/uploads" });

router.route("/")
    .get(articleController.get_all_article)
    .post(upload.single("banner"), articleController.add_article)

module.exports = router