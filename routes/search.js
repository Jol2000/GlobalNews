const express = require('express');
const router = express.Router()

// Import NewsAPI
const NewsAPI = require('newsapi');

// News API Key
const newsapi = new NewsAPI('c532680f193b489ab323cc7fb7bed607');

router.get('/:id',(req, res) => {
	// Call News API 
	newsapi.v2.topHeadlines({
		//Specify Source by country
		country: req.params.id,
		// Ensure results are in english
		language: 'en',
		// Request 50 queries
		pageSize: 50,
	}).then( async function(response){
		if (response.status == 'ok' && response.articles.length > 0) {
			articles = buildArticles(response);
			const results = await Promise.all(articles);
			topHeadlines = {
					"articles": results.slice(1,20),
					"country": req.params.id,
					"status": "ok"
			};
			res.render('search_content',{topHeadlines : topHeadlines, country: req.params.id});
		}
		else {
			res.render('search_content',{topHeadlines : ""})
		}
	}).catch((err) => {
		res.render('error', { message: "An Error Occured Fetching Articles", error: err });
	});
});

// Cleaning the responses
function buildArticles(response) {
	const articles = response.articles.map(async article => {
		let content;
		if(article.content !== null ){
			if(article.content.split(" ").length >= 20){
				content = await getCategory(article.content);
			}
			else{
				content = "";
			}
			if(Object.entries(content).length !== 0){
				return {
					"title": article.title,
					"url": article.url,
					"published": article.publishedAt,
					"image_url": article.urlToImage,
					"description": article.description,
					"author": article.author,
					"content": content,
					"url": article.url
				}
			}
		}
	})
	return articles;
}

async function getCategory(text) {
	// Imports Google Client Library
	const language = require('@google-cloud/language');
	
	// Instantiates client
	const client = new language.LanguageServiceClient();

	const document = {
	  content: text,
	  type: 'PLAIN_TEXT',
	};

	let content_labels = {};
	// Detect category of article
	try{
		const [classification] = await client.classifyText({document: document});
		if(classification.categories == undefined){
			return '';
		}
		else{
			classification.categories.forEach(category => {
				console.log(`Name: ${category.name}`);
				content_labels[category.name] = category.confidence
			});
			return content_labels;
		}
	}
	catch (err){
		console.log(err);
		return '';
	}
  
}

module.exports = router;