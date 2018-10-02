const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
var app = express();
var i = 1;
//var cookieparser = require('cookie-parser');
var bodyparser = require('body-parser');
//var session =  require('express-session');
var passport = require('passport');
//var routes = require('./routes.js');
var expsess  = require('express-session');
var mongoose = require('mongoose');
var dresses = require('./tutorial/tutorial/dresses.json');
var afrodresses = require('./models/afrodresses.js');
app.set('view engine', 'ejs');

app.use(express.static(__dirname));
// if(dresses)
// {


// 	dresses.forEach(function(item)

// {
// 		i++;
// 		console.log(item.title);

// }

// 		);
// 	console.log(dresses);
// }
console.log("test");
mongoose.connect('mongodb://mk2005:Snow5432@ds223812.mlab.com:23812/plus_size', function(err)


{

if(err)
{
	console.log("err");

}

else
{
	console.log("success");
}
}


);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));




app.get('/', (req, res) => 
	afrodresses.find({}, null, {sort:{price: 1}}, (err, data) =>
	{
		if(data)
		{
			data.forEach((item) =>

{

console.log(data.length);


}
				);
			//console.log(data);
			//console.log("afrodresses found")
			res.render('home.ejs', {data: data});
		}


		}));


	app.get('/product/:prodid', (req, res) =>
{
	afrodresses.find({id: req.params.prodid}, (err, data) =>

{
if(data.length > 0)
{

res.render('product_listing.ejs', {data: data});


}
else
{
	afrodresses.find({_id: req.params.prodid}, (err, data) =>

{
if(data.length > 0)
{

res.render('product_listing.ejs', {data: data});


}
});
}

}

		)


}


		)