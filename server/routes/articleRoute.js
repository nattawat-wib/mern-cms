const express = require("express");
const router = express.Router();
const articleController = require("../controller/articleController");
const multer = require("multer");

const upload = multer({  dest: "./../client/public/uploads" });
const multi_file_upload = upload.fields([{ name: "thumbnail" }, { name: "banner" }]);

router.route("/")
.get(articleController.get_all_article)
.post(multi_file_upload, articleController.add_article)

router.route("/:url")
    .delete(articleController.delete_article)
    .get(articleController.get_article)

module.exports = router