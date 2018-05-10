const express = require("express"); 
const request = require("request"); 
const bodyParser = require("body-parser"); 

//start express server
const app = express(); 
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json()); 
app.listen((process.env.PORT || 5000)); 

//server index page 
app.get("/", function (req, res){
	res.send("firstDeploy")
}); 

//facebook webhook for verification 
app.get("/webhook", function (req,res){
	if (req.query["hub.verify_token"] === "sagesurebot") {
		console.log('verified the webhook'); 
		res.status(200).send(req.query["hub.challenge"]); 
	} else {
		console.error('Verification failed. The tokens dont match');
		res.sendStatus(403);
	}
})
