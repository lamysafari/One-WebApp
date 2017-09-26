var http = require("http");
var router = express.Router();
var cheerio = require("cheerio");
var fs = require("fs");
var express = require("express");

router.get("/homeData",function(req,res){
    var homeDesc = {},
        homeArticle = {};
        homeQuestion = {};
        _html;
    http.get("http://m.wufazhuce.com/",function(response){
        response.on("data",function(chunk){
            _html += chunk;
        });
        response.on("end",function(){
            console.log("爬取结束")
            $ = cheerio.load(_html);
            var homeLink = ($(".link-div a").attr("href")).split("/");
            homeDesc.id = homeLink[homeLink.length-1];
            homeDesc.day = $(".day").text();
            homeDesc.month = $(".month").text();
            homeDesc.textShort = $(".text-content-short").text();
            homeDesc.href = $(".link-div a").attr("href");
            homeDesc.bgImg = $(".home-img").attr("style");

            var articleLink = ($(".text-more a").attr("href")).split("/");
            homeArticle.id = articleLink[articleLink.length -1];
            homeArticle.artTitle = $(".article .text-title").text();
            homeArticle.artAuthor = $(".article .text-author").text();
            homeArticle.artShort = $(".article .text-content-short").text();
            homeArticle.artShortImg = $(".article .one-img-container img").attr("src");

            var questionLink = ($(".question .text-more a").attr(href)).split("/");
            homeQuestion.id = questionLink[questionLink.length-1];
            homeQuestion.quesTitle = $(".question .text-title").text();
            homeQuestion.quesShort = $(".question .text-content-short").text();
            res.send({"homeDesc":homeDesc,"homeArticle":homeArticle,"homeQuestion":homeQuestion});
        });
    }).on("error",function(err){
        console.log(err);
    });
});

router.get("/readDetail",function(req,res){
    var aId = req.query.aId;
    var detail = {};
    var _html;
    detail.editor = [];
    http.get("http://m.wufazhuce.com/article/"+aId,function(response){
        response.on("data",function(chunk){
            _html += chunk;
        });
        response.on("end",function(){
            console.log("爬取结束");
            
        })
    })
})
module.exports = router;