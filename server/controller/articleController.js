const Article = require("../model/articleModel");

exports.add_article = async (req, res) => {
    req.body.article = JSON.parse(req.body.article);
    
    const not_valid_key = [];
    ["title", "desc", "url"].forEach(key => {
        if(!req.body.article[key]) not_valid_key.push(key)
    });

    ["thumbnail", "banner"].forEach(key => { 
        if(!req.files[key]) not_valid_key.push(key)
    });

    if(not_valid_key.length) {        
        return res.status(200).json({
            status: "error",
            message: `${not_valid_key.join(", ")} is not allowed to be empty!`,
        })
    }

    if(req.body.article.url.includes(" ")) {
        return res.status(200).json({
            status: "error",
            message: "url should not be contain space",
        })        
    }

    const new_article = await Article.create({
        ...req.body.article,
        thumbnail: req.files.thumbnail[0].filename,
        banner: req.files.banner[0].filename,
    })

    res.status(200).json({
        status: "success",
        message: "Add article successfully",
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