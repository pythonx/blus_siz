var ub = require('./models/userbooks.js');
var usr = require('./models/user.js');
const path = require('path');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var rb = require('./models/reqbooks.js');
var fd = require('./models/flightdeals.js');
var cmnts = require('./models/comments.js');
function comparepass(subpass, actpass, cb)

{


	bcrypt.compare(subpass, actpass, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

function userbookdata(arr)
{
arr.forEach(function(item)


{

	
	$.get( "https://www.googleapis.com/books/v1/volumes?q="+item, function( data ) {

	//alert(bname);

if(data)
{
var item = data.items[0];

	var bookid = item.volumeInfo.industryIdentifiers[0].identifier;
	var btitle = item.volumeInfo.title;
	
   if(item.volumeInfo.imageLinks)
   {
   	
   
   	var imglink = item.volumeInfo.imageLinks.smallThumbnail;

var itemeach = {bookid: bookid, btitle: btitle, imglink: imglink};
console.log(itemeach);

}
}



	
// 	console.log("data");

// var url = "http://localhost:5000/bsrch";
// 	var xhr = new XMLHttpRequest();
// xhr.open("POST", url, true);
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.send(JSON.stringify({
//     value: data
// }));
});



});
}


module.exports = function(app, passport)

{

app.get('/', function(req, res)


{
	var dealdata = [] ;
	fd.find({}, function(err, data)

{

	if(err)
	{
		console.log("error dealdata");
	}
	if(data)
	{

dealdata = data;
console.log(dealdata);
res.render("home.ejs", {dealdata: dealdata});
	}
}

		);

	// console.log("get it");

	// console.log(req.session);
	// console.log(req._passport);
	// console.log(req.session.passport);
if(req.user)
{
	// console.log(req.user);
	// console.log(req.user.id);
	res.redirect('/profile');
}
else
{
// res.sendFile(path.join(__dirname+'/test.html'));
// res.render("home.ejs", {dealdata: dealdata});

// votem.find({},'name', function(err, data)
// {
// if(!err)
// {
// 	res.render("home.ejs", {message: data});
// }
// else
// {
//   console.log(err);
// }
// })

// ;
	//res.end("hey there");
}
}
	);

app.get('/logout', function(req, res)

{
	req.logout();
	res.redirect('/');
}

);


app.get('/add_new_deal', function(req, res)
{
res.render('add_deal.ejs');

}

	);

app.post('/comments', function(req, res)

{
	var test = {id: String, parent: {}, created: String, created_by_current_user :Boolean, fullname: String, modified: String, content: String, profile_picture_url:String,upvote_count: String, user_has_upvoted: Boolean};
	var id = req.body.id;
	var parent = req.body.parent;
	var created = req.body.created;
	var created_by_current_user = req.body.created_by_current_user;
	var fullname = req.body.fullname;
	var modified = req.body.modified;
	var content = req.body.content;
	var profile_picture_url = req.body.profile_picture_url;
	var upvote_count = req.body.upvote_count;
	var user_has_upvoted = req.body.user_has_upvoted;
	console.log("end");
	res.end("end");
	if(req.body)
	{
		console.log(req.body);
		console.log("req.body logged");

		res.end("end");
	}
}

);	
app.post('/search_deal', function(req, res)

{
	if(req.body.c_search)
	{
		//res.end(req.body.c_search);
fd.find({origin:req.body.c_search}, function(err, data)

{
if(err)
{
	res.end(JSON.stringify({error: "error"}));
}
else if(data.length>0)
{
	res.end(JSON.stringify(data));
}
else
{
	res.end(JSON.stringify({error: "nil"}));
}
	
}

);
		
		//res.end("apprved");
	}
	
}

);	
app.post('/add_deal', function(req, res)

{ 
	var airline;
var arrdate;
	if(req.body.origin && req.body.dest && req.body.origin_aport && req.body.dest_aport  && req.body.tripclass && req.body.triptype && req.body.fare && req.body.depdate)
	{
			if(req.body.airline)
		{
		airline = req.body.airline;
	}
	else
	{
	airline = '';	
	}

	if(req.body.arrdate)
		{
		arrdate = req.body.arrdate;
	}
	else
	{
	arrdate = '';	
	}
		console.log("suff data");
		var origin = req.body.origin;
		var dest = req.body.dest;
		var origin_aport = req.body.origin_aport;
		var dest_aport = req.body.dest_aport;
		var triptype = req.body.triptype;
		var tripclass = req.body.tripclass;
		var depdate = req.body.depdate;
		var fare = req.body.fare;
		var finddeal = {origin: origin, dest: dest, origin_aport: origin_aport, dest_aport: dest_aport, depdate: depdate, arrdate: arrdate, triptype: triptype, tripclass: tripclass, airline: airline, fare: fare};
		fd.find(finddeal, function(err, data)

{
if(err)
{
console.log("err");
}


else
{
	if(data.length>0)
	{
		console.log("err data");

	}
	else
	{
		fd.create(finddeal, function(err, data)
{

if(data)
{
	console.log("data created");
}

}

			);
	}
}
}

			);
		//console.log(req.body);
}

else
{
console.log('insufficient data');
}

});	
app.post('/newreg', function(req, res)


{

	console.log(req.body);

	if(req.body.username && req.body.password && req.body.fname)
{
	var fname = req.body.fname;
var uname = req.body.username;
var pass = req.body.password;
const saltRounds = 10;

bcrypt.genSalt(saltRounds, function(err, salt) {


	if(err)
	{
		console.log("gensalt err");
	}
    bcrypt.hash(pass, salt, function(err, hash) {

    	if(err)
    	{

    		console.log("hash err");
    	}
pass = hash;

usr.create({fname: fname, username: uname, password: pass}, function(err, user)

{
	if(err)
	{
console.log("create error");
	}
console.log("user created");

}

	);

        // Store hash in your password DB.
    });
});

}

else
{
	console.log("insufficient data");
}
}
	
);


app.post('/memchk', function(req, res)


{
	console.log(mongoose.Schema.methods);
console.log("memchk");

	if(req.body.username && req.body.password)

	{

		console.log("memchk2");

usr.findOne({username: req.body.username}, function(err, user)

{
	if(err)

	{

		console.log("user find error");

	}

	console.log(user);
	console.log(user.length);
	console.log(user.password);
if(user.username && user.password)
{
	comparepass(req.body.password, user.password, function(err, ismatch)

{


	if(err)
	{

		console.log("pass comp error");

	}

	if(ismatch)
	{
		console.log("password matched");
	}

	else
	{

		console.log("password doesn't match");
	}
}



		);
}

else
{
	console.log("user find error 2");
}

}


	);
	}
}

	);




app.post('/auth/local', 
  passport.authenticate('local', { failureRedirect: '/auth/local' }),
  function(req, res) {
  	//console.log('local authenticated');
    res.redirect('/');
  });
app.get('/auth/local', function(req, res)

{
res.render('login.ejs')
}

	);


app.get('/newuser', function(req, res)

{
res.render('newuser.ejs');
}

	);

app.get('/auth/twitter', passport.authenticate('twitter') );
app.get('/auth/twitter/cb', passport.authenticate('twitter', {successRedirect: '/', failureRedirect: '/'}));
app.get('/profile', function(req, res)

{
	var arrbooks = [];
	if(req.user.username)
	{

		console.log("profile test");
		console.log(req.user.username);

ub.find({User: req.user.username}, function(err, data)

{
	

	if(err)
	{
console.log(err);

	}

	else
	{
		console.log(data);
		if(data.length > 0)
		{
			console.log(data.length);
			
			data.forEach(function(item)

{
 arrbooks.push(item);

// console.log(arrbooks);






// 	$.get( "https://www.googleapis.com/books/v1/volumes?q="+item.id, function( data ) {

// 	//alert(bname);

// if(data)
// {
// var item = data.items[0];

// 	var bookid = item.volumeInfo.industryIdentifiers[0].identifier;
// 	var btitle = item.volumeInfo.title;
	
//    if(item.volumeInfo.imageLinks)
//    {
   	
   
//    	var imglink = item.volumeInfo.imageLinks.smallThumbnail;

// var itemeach = {bookid: bookid, btitle: btitle, imglink: imglink};
// console.log(itemeach);

// }
// }


	
// // 	console.log("data");

// // var url = "http://localhost:5000/bsrch";
// // 	var xhr = new XMLHttpRequest();
// // xhr.open("POST", url, true);
// // xhr.setRequestHeader('Content-Type', 'application/json');
// // xhr.send(JSON.stringify({
// //     value: data
// // }));
// });














}


				);
			// userbookdata(arrbooks);
		}

		res.render('profile.ejs',{user: req.user, bookdata: arrbooks} );
	}

});



		//res.render('profile.ejs', {user: req.user});
		
	}

	else
	{
		// res.redirect('/');

		res.render('profile.ejs',{user: req.user, bookdata: arrbooks} );
	}
}
	);

app.get('/new', function(req, res)

{
if(req.user)
{
	res.render('newpoll.ejs');
}
else
{
	res.redirect('/');
}
}
	);

app.post('/bsrch', function(req, res)

{
 // res.end('response text');
	
	if(req.body.bid && req.body.bimg)
	{
		var retval = {};
		console.log(req.user.id+"userid");


		ub.find({Bookid: req.body.bid, User: req.user.username}, function(err, data)
{

	if(err)
	{
console.log("error");
retval = {val: 'error'};
res.end(JSON.stringify(retval));
	}


	else if (data.length > 0)
	{

		console.log("data found");

		retval = {val: 'data found'};
		res.end(JSON.stringify(retval));

console.log(data);
		console.log(retval);

	}

	else
	{
		ub.create({Bookid: req.body.bid, Bookimg: req.body.bimg, User: req.user.username, Name: req.body.bname}, function(err, data)

{

	if(err)
	{

		retval = {val: 'create error'};
		res.end(JSON.stringify(retval));

	}

	else
	{
       console.log(data);
retval = {val: 'data inserted'};
	}

	res.end(JSON.stringify(retval));
}

			);

		// console.log("no data");


	}

	// console.log("re2");
	// 	 console.log(req.body);
	// 	 console.log(retval);

	
}

			);

		 
// res.end('response text 2');



// var srch = req.body.bsrch;
// $.get( "https://www.googleapis.com/books/v1/volumes?q="+srch, function( data ) {
 
// if(data)
// {
// 	res.render('bdata.ejs', {message: srch});
// }

//   $( ".result" ).append( JSON.stringify(data));
//   console.log(typeof data);
//   alert( "Load was performed." );
// });












		// res.render("bdata.ejs", {message: srch});
	}
	else
	{
 
 res.end("not true");
	}
}

);

app.post('/reqbook', function(req, res)

{ 
	if(req.user && req.body.bid &&  req.body.bname && req.body.bowner && req.body.bimg )

	{
		console.log(req.user.username);
rb.create({Bookreq: req.user.username, Bookowner: req.body.bowner, Bookimg: req.body.bimg, Bookname: req.body.bname, Bookid: req.body.bid}, function(err)


{

	if(err)

	{

	}


	else

	{

		var retval = {val: 'book requested'};
		res.end(JSON.stringify(retval));



	}
}

	);



	}
	
}

);


app.post('/delbook', function(req, res)

{

if(req.body.bid)
{
	ub.deleteOne({Bookid: req.body.bid, User: req.user.id}, function(err)

{
	if(err)
	{
		console.log("delbook err");
	}
	else
	{
		var retval = {val: 'data deleted'};
		res.end(JSON.stringify(retval));

	}
}

		);

}
}

	);

app.post('/new', function (req, res)

{
if(req.user && req.body.polltitle && req.body.polloptions)

{
	var i = 0;
	var opsarr = [];
	var pollops = req.body.polloptions.split('/');
	pollops.forEach(function(item)

	{
opsarr.push({index: i,name: item, value: 0});
i++;
	});

	votem.create({name: req.body.polltitle, optiondetails: opsarr, User: req.user.username, }, function(err, usr)

{

	if(err)
	{
		throw err;
	}

	else
	{
		res.redirect('/poll/'+usr.id);
	}
}

		);

		
}
}

	);

app.post('/polldetails', function(req, res)

{
	if(req.body.opt && req.body.pid)
	{
		// console.log(req.body.opt);
		// console.log(req.body.pid);
		//var optiondetails= [];
		//optiondetails[req.body.opt].value = 0;
		var upval = 'optiondetails.'+req.body.opt+'.value';
		var incr = {$inc: {}};
		incr.$inc[upval] = 1;
		console.log(incr);
		votem.update({_id: req.body.pid}, incr, function(err, data)

{
if(err)
{

	throw err;
}

if(data)
{
	res.redirect('/poll/'+req.body.pid);
console.log(data);
}

}

			);
	}
}

);	


app.get('/all', function(req, res)

{
	if(req.user)
	{
	ub.find({User: {$ne: req.user.username}}, function(err, data)
{

if(err)
{

}
if (data)
{
	var allbooks = [];
	var dupchk = "";


res.render('all.ejs', {data: data});
}


}


		);

}
}

);	

app.get('/requests', function(req, res)

{
	var arr1 = [];
	var arr2 = [];
	if(req.user)
	{

		rb.find({Bookreq: req.user.username}, function(err, data)

{

	if(err)
	{

	}

else
{
	if(data)
	{

		arr1 = data;
		//console.log(arr1);
		//		console.log("arr1");

		//res.render('requests.ejs', {data: data});



rb.find({Bookowner: req.user.username}, function(err, data)

{

	if(err)
	{

	}

else
{
	if(data)
	{

		arr2 = data;
		//console.log(arr2);



		//res.render('requests.ejs', {data: data});
res.render('requests.ejs', {data1: arr1, data2: arr2});

	}
}

console.log(arr1);
console.log("arr1");
console.log(arr2);
console.log("arr2");
}


			);





		


	}
}
}


			);




		






console.log(arr2);




	
}
}

);	

	app.get('/poll/:pollid', function(req, res)

{
	votem.findOne({_id: req.params.pollid }, function(err, data)


{
	if(err)
	{
res.redirect('/');
	}
else
{
	if(data)
	{
	res.render('polldetails.ejs', {message: data});
}
else
{
	res.redirect('/');
}
}

}

		);

}

);


		app.get('/pollrem/:pollid', function(req, res)

{
	if(req.user)
	{

	votem.remove({_id: req.params.pollid, User: req.user.username }, function(err, data)



{
	if(err)
	{
res.redirect('/');
	}
else
{
	



		res.redirect('/profile');

	
}

}

		);
}
}



);

};
