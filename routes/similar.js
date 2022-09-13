const express = require('express');
const NewsAPI = require('newsapi');
const router = express.Router();

// News API Key
const newsapi = new NewsAPI('c532680f193b489ab323cc7fb7bed607');

router.get('/:country/:category',(req,res)=> {
    newsapi.v2.topHeadlines({
        //Specify Source 
        country: req.params.country,
        //Specify Category
        category: req.params.category,
        //Ensure results in English
		language: 'en',
        // Request 50 queries
		//pageSize: 50,
	}).then( response => {
        let topHeadlines;
        if(response.status == 'ok' && response.articles.length > 0){
            topHeadlines = {
                "articles": response.articles.slice(1,20),
                "status": "ok"
            };
            res.render('similar_content',{topHeadlines: topHeadlines,country: req.params.country, category: req.params.category})
        }
        else{
            res.render('similar_content',{topHeadlines: ''})
        }
    }).catch((err) => {
		res.render('error', { message: "An Error Occured Fetching Articles", error: err });
	});
})

module.exports = router;