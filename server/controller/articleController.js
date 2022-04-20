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

    res.status(200).json({
        status: "success",
        data: all_article
    })
}

exports.delete_article = async (req, res) => {    
    await Article.findOneAndDelete({ url: req.params.url })

    res.status(200).json({ status: "success" })
}

exports.get_article = async (req, res) => {
    const article = await Article.findOne({ url: req.params.url });

    if(!article) {
        res.status(404).json({
            status: "error",
            msg: "this article is not exist!!!"
        })
        return 
    }
    
    res.status(200).json({
        status: "success",
        data: article
    })
}