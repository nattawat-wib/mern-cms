const Article = require("../model/articleModel");

exports.add_article = async (req, res) => {
    const new_article = await Article.create({
        ...JSON.parse(req.body.article),
        banner: req.file.filename
    })

    res.status(200).json({
        status: "success",
        data: new_article
    })
}

exports.get_all_article = async (req, res) => {
    const all_article = await Article.find();

    console.log(all_article);

    res.status(200).json({
        status: "success",
        data: all_article
    })
}