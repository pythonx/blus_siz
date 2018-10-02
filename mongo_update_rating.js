var mongoose = require('mongoose');
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
afrodressmodel.collection.dropAllIndexes(function (err, results) {
	console.log("results start")
	console.log(results)
	console.log("results end")
    // Handle errors
});


afrodressmodel.find({}, function(err, data)

{

// 	data.forEach(function(item)
// {
// afrodressmodel.update({"_id": item._id,}, { $set: {rating: parseInt(item.rating) }}, function(err, data)

// {

// 	if(data)
// 	{
// 		console.log("success");
// 	}
// }

// 	);

// }



// 		)

i = 0


	data.forEach(function(item)
{
	// console.log(item.rating)
	i = i+1
	console.log(i)
	
	if(item.price.match(/\$|\s/g))
	{
		var rep = item.price.replace((/\$|\s/g),"")
		console.log(rep)
// 		i = i+1
// 		console.log(i)
// console.log(typeof item.price)
// console.log("matched")

afrodressmodel.update({"_id": item._id,}, { $set: {price: rep}}, function(err, data)

{

	if(data)
	{
		console.log("success");
	}
}

	);




	}
// afrodressmodel.update({"_id": item._id,}, { $set: {rating: parseInt(item.rating) }}, function(err, data)

// {

// 	if(data)
// 	{
// 		console.log("success");
// 	}
// }

// 	);

}



		)











// 	data.forEach(function(item)
// {
// console.log(typeof item.price)
// 	console.log(item.price + 6)

// })
}

	)