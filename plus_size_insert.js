var mongoose = require('mongoose');
var dresses = require('../tutorial/tutorial/diyanu_african_dresses.json');
var dressmodel = require('./models/dresses.js');
var afrodressmodel = require('./models/afrodresses.js');

mongoose.connect('mongodb://mk2005:Snow5432@ds223812.mlab.com:23812/plus_size', function(err)
{
	if(!err)
	{
		console.log("success");
	}
	else
	{
		console.log(err);
		console.log("error");
	}
console.log("function called");
}
);

//console.log(dresses);
//console.log(dressmodel);
console.log("logged");

afrodressmodel.collection.dropAllIndexes(function (err, results) {
	console.log("results start")
	console.log(results)
	console.log("results end")
    // Handle errors
});

var i = 1;
dresses.forEach(function(item)


{
	console.log(dresses.length+"length of dresses")
	// {
	//  return;
	// }
	afrodressmodel.create({id: item.id, link: item.link, seller: item.seller,  title: item.title, img: item.img, price: item.price, sizes: item.sizes, rating: item.rating, website: item.website, handmade: item.handmade, img_local: item.img_local, img_resized: item.img_resized}, function(err, data)

{
	if(data)
	{
		console.log("data inserted");
		console.log(data);

	}
	else
	{
		console.log(err);
		console.log('error');
	}
}

		)

});