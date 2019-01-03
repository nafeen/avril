import { IEXClient } from 'iex-api'
import _fetch from 'isomorphic-fetch'

/**********************************************************************************************
 *
 * THIS SCRIPT CREATES THE WEB SERVER FOR RUNNING IEX APP
 *
 ********************************************************************************************** */


/* ============================================================================================
 * TODO:
 *
/* ============================================================================================ */


// ADDING middlewares and other dependencies
var express				=   require('express');
var bodyParser 			=	require('body-parser');
var app 				=   express();


// Auto-redirect HTTP requests to HTTPS
// app.use(function(req, res, next) { 
//     // console.log("|| Request Log || ", req.get('X-Forwarded-Proto'), "/", req.get('Host'), req.url);
//     if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'].toLowerCase() === 'http') {
//         console.log("Redirecting HTTP to HTTPS");
//         return res.redirect('https://' + req.headers.host + req.url);
//     }
//     else {
//         next();
//     }
// });

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Routing for IEX App
app.use('/', express.static('./apps/iex-app'));

app.post('/post-data', function(req, res) {
	// console.log(req.body.companyName, req.body.metric);
	const iex 		= new IEXClient(_fetch);
	const company 	= req.body.companyName;
	const metric	= req.body.metric;
	switch(metric) {
		case "Company Info": iex.stockCompany(company).then(data => res.send(data));break; 
		case "Financials": iex.stockFinancials(company).then(data => res.send(data));break;
		case "News": iex.stockNews(company).then(data => res.send(data));break;
		case "Quote": iex.stockQuote(company).then(data => res.send(data));break;
		case "XXX": iex.stockXXX(company).then(data => res.send(data));break;
		default: res.send("Oops! Please checek the company ID");
	}
});


// listening on port 3000
app.listen(3000);


// Logging status to console
console.log("--------------------------------------------------");
console.log("----- IEX app server running at port 3000 -----");
console.log("--------------------------------------------------");

/*********************************************************************************************/
/*********************************************************************************************/