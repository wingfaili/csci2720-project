// include express module
var express = require("express");
var mongoose= require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');

require('./UserSchema');
require('./SandwichSchema');
require('./OrderSchema');

var app = express();

app.use(express.static(__dirname));

app.use(session({
  secret: 'foobarbazz',
  resave: true,
  saveUninitialized: false
}));

// vvvvvvvvvvvvvvvv Part for database vvvvvvvvvvvvvvvv //
//Uncomment the following line when going to push the code to heroku
mongoose.connect( 'mongodb://' + process.env.MONGOLAB_URI );

//var Student = mongoose.model('Student');
var User = mongoose.model('User');
var Sandwich = mongoose.model('Sandwich');
var Order = mongoose.model('Order');

// C: create
app.get('/insert', function(req, resp) {
    var s = new Sandwich( {name: req.query.name} );
    s.save(function(err,sandwich){
        resp.redirect('/selectSandwich');
    });
});

// R: read
app.get('/select', function(req, resp) {
    User.find(function(err, users){
        resp.send(users);
    });
});

app.get('/selectSandwich', function(req, resp) {
    Sandwich.find(function(err, sandwiches){
        resp.send(sandwiches);
    });
});

app.get('/selectOrder', function(req, resp) {
    Order.find(function(err, orders){
        resp.send(orders);
    });
});

// U: update
app.get('/update', function(req, resp) {
    var query = { name: req.query.old_name };
    Sandwich.findOneAndUpdate(query, { name: req.query.new_name }, function(err, sandwiches){
        resp.redirect('/selectSandwich');
    });
});

// D: delete
app.get('/delete', function(req, resp){
  Sandwich.findOneAndRemove(req.query.name, function(err, sandwiches){
    resp.redirect('/selectSandwich?name='+req.query.name);
  });
});

// ^^^^^^^^^^^^^^^ Part for database ^^^^^^^^^^^^^^^ //

app.get('/', function(req, resp) {
    console.log("hello");
    resp.sendFile(__dirname + "/index.html");
});
/*
app.get('/', function(req, resp) {
  if(req.session.user.username){
    //app.use(express.static(__dirname));
    //resp.sendFile(__dirname + "/action.html");
  }
  else{
    //app.use(express.static(__dirname));
    //resp.sendFile(__dirname + "/index.html");
    console.log('back to login page');
    resp.send("hello");
  }
});*/
/*
function authUser(name, callback){
  User.find({username:name}, function(err,user)
  {
    console.log(typeof(user));
    console.log("hello: "+ user.username);
    console.log("hihi: "+user.password);
    console.log("usdsdas:" + user);
    callback(err,user);
  });
}
*/

function authenticate(name,password, callback){
  User.findOne({username:name, password:password}, function(err,user){
  /*  if(user){
      if(err) return fn(new Error('cannot find user'));
    }
    else{
      return fn(new Error('cannot find user'));
    }
*/
  callback(err,user);
  });
}


app.post('/login', bodyParser.urlencoded({extended: false}));
app.post('/login', function(req, resp) {
  var username = req.body.username;
  var password = req.body.password;
  //req.session.username = req.body.username;
  //req.session.password = req.body.password;
  console.log("username:" + username + "\npassword:" + password);
  //console.log("username:" + username + "\npassword:" + password);
  // Check username in db, following is dummy
/*authUser(req.body.username, function(err,user){
 if(user){

  req.session.username = user.username;
  req.session.password = user.password;
  console.log("username"+ user.username);
  console.log("session user" + req.session.username);
  console.log("pw" + user.password);
  console.log("spw" + req.session.password);
  console.log("Login Success");
  resp.sendFile(__dirname + "/action.html");



}*/
authenticate(req.body.username, req.body.password, function(err,user){

  if(user){

    req.session.regenerate(function(){
      req.session.user=user;
    console.log(typeof(user));
    //console.log("hello: "+ user.username);
    //console.log("hihi: "+ user.password);
    //console.log("usdsdas:" + user);
    req.session.user.username = user.username;
    req.session.user.password = user.password;
    //req.session.password = user.password;
    //console.log("username"+ user.username);
    console.log("session user" + req.session.user.username);
    //console.log("pw" + user.password);
    //console.log("spw" + req.session.password);
    console.log("Login Success");
    resp.sendFile(__dirname + "/action.html");
  });
}
  else{
     console.log("Login Fail");
     resp.redirect('/');
     //resp.end("bad");
   }
  });

 // else {
 //    console.log("Login Fail");
 //    resp.redirect('/');
 //    //resp.end("bad");
 //  }
//});


});
//  if ((username == "a") && (password == "a")) {


// vvvvvvvvvvvvvvvv Part for sandwich vvvvvvvvvvvvvvvv //
app.get('/sandwich', function (req, resp) {
  console.log("in /sandwich");
  resp.sendFile(__dirname + "/sandwich/sandwich.html");
});

app.get('/s_start', function (req, resp){
  console.log("in /s_start");
  resp.sendFile(__dirname + "/sandwich/s_start.html");

  var owner = req.session.user._id;
  Sandwich.findOneAndUpdate({owner:owner, edit:"editing"}, {edit: "null"}, function(err, sandwich){
    console.log("success");
  });
});

// 20151219 Fai - add checking for 10 sandwiches before start a new one
app.get('/check10', function(req, resp){
  var owner = req.session.user._id;
  Sandwich.count({owner:owner}, function(err,count){

    console.log("total no. of sandwiches: %d", count);
    if(count >= 10){
      resp.send("full");
    }
  });
});

/*
app.get('/check10', function(req, resp){
  resp.sendFile(__dirname + "/sandwich/s_view.html");
});
*/

app.get('/s_submit', function (req, resp){
  console.log("in /s_submit");
  //Do the action to store the data to db
  console.log("Store the data to database here");

  var s = new Sandwich({
                        owner: req.session.user._id,
                        name: req.query.sandwich,
                        breadtype: req.query.bread,
                        size: req.query.size,
                        vegetable: req.query.vegetable,
                        meat: req.query.meat,
                        cheese: req.query.cheese,
                        source: req.query.source,
                        comment: req.query.comment,
                        edit: req.query.edit
                      });
  s.save(function(err, sandwich){
  resp.sendFile(__dirname + "/sandwich/s_view.html");
});
//console.log(req.query.sandwich);
//resp.sendFile(__dirname + "/sandwich/sandwich.html");
});

app.get('/s_view', function (req, resp){
  console.log("in /s_view");
  resp.sendFile(__dirname + "/sandwich/s_view.html");

  var owner = req.session.user._id;
  Sandwich.findOneAndUpdate({owner:owner, edit:"editing"}, {edit: "null"}, function(err, sandwich){
    console.log("success");
  });

});


app.get('/view_sandwich', function (req, resp){
  //var owner = req.session.user
  var owner = req.session.user._id;
  console.log("in /view_sandwich");
  //console.log("current data: " + req.query.curr_user);
  console.log("req.session.user._id: " + req.session.user._id);
  console.log("current session: "+ owner);

  Sandwich.find({owner:owner}, function(err,sandwich){
    console.log(sandwich);
    resp.send(sandwich);
  });
});

// 20151220 Fai - hide edit temporarily

app.get('/s_edit', function (req, resp){
  console.log("in /s_edit");
  var owner = req.session.user._id;
  var sandwich_name = req.query.sandwich_name;
  Sandwich.findOneAndUpdate({owner:owner, name:sandwich_name},{edit:"editing"}, function(err,sandwich){
    console.log(sandwich);
    //s.save(function(err,sandwich){
      resp.sendFile(__dirname + "/sandwich/s_edit.html");
    //});
    //resp.sendFile(__dirname + "/sandwich/s_edit.html");
    //resp.send(sandwich);
  });
});

app.get('/edit_sandwich', function(req, resp){
  var owner = req.session.user._id;
  Sandwich.find({owner:owner, edit:"editing"}, function(err,sandwich){
    resp.send(sandwich);
  });
});


app.get('/s_edit_submit', function (req, resp){
  console.log("in /s_submit");
  //Do the action to store the data to db
  console.log("Store the data to database here");
  /*
  var query = {
                //owner: req.session.user._id,
                name: req.query.oldsandwich,
                breadtype: req.query.oldbread,
                size: req.query.oldsize,
                vegetable: req.query.oldvegetable,
                meat: req.query.oldmeat,
                cheese: req.query.oldcheese,
                source: req.query.source,
                comment: req.query.oldcomment,
                edit: req.query.oldedit
              };*/
  var owner = req.session.user._id;
  var sandwich_name = req.query.sandwich_name;
  //Sandwich.findOneAndUpdate({owner:owner, edit:"editing"},{name:req.query.new_sandwich_name, edit:"null"},function(err,sandwich){
  Sandwich.findOneAndUpdate({owner:owner, edit:"editing"},{name:req.query.new_sandwich_name, breadtype:req.query.bread, size:req.query.size, vegetable:req.query.vegetable, meat:req.query.meat, cheese:req.query.cheese, source:req.query.source, comment:req.query.comment, edit:"null"}, function(err, sandwich){
  resp.sendFile(__dirname + "/sandwich/s_view.html");

//console.log(req.query.sandwich);
//resp.sendFile(__dirname + "/sandwich/sandwich.html");
//});
});
});

app.get('/s_delete', function (req, resp){
  console.log("in /s_delete");
  var owner = req.session.user._id;
  var sandwich_name = req.query.sandwich_name;
  console.log("owner: %s",owner);
  console.log("sandwich_name: %s", req.query.sandwich_name);

  Sandwich.findOneAndRemove({owner:owner, name:sandwich_name}, function(err,sandwich){
  //Sandwich.remove(function(err,sandwich){
  //  if (err) return handleError(err);
    console.log("successful remove one sandwich");
    resp.sendFile(__dirname + "/sandwich/s_view.html");
    //resp.redirect('/s_view?sandwich_name='+sandwich_name);
  //});
  });

  //resp.redirect('/s_view?sandwich_name='+sandwich_name);
});


// ^^^^^^^^^^^^^^^ Part for sandwich ^^^^^^^^^^^^^^^ //


// vvvvvvvvvvvvvvvv Part for order vvvvvvvvvvvvvvvv //

app.get('/order', function (req, resp) {
  console.log("in /order");
  resp.sendFile(__dirname + "/order/order.html");
});

app.get('/o_start', function (req, resp){
  console.log("in /o_start");
  resp.sendFile(__dirname + "/order/o_start.html");
});

app.get('/o_submit', function (req, resp){
  console.log("in /o_submit");
  //Do the action to store the data to db
  var owner = req.session.user._id;
  //var order_sandwichType = req.query.o_start_sandwichType.toString();
  //var count[10] = req.query.o_start_sandwichType;
//  var order_quantity = req.query.o_start_quantity.toString();
  console.log(req.query.o_start_quantity);
  console.log(typeof(req.query.o_start_sandwichType));
  console.log(req.query.o_start_sandwichType);
  //console.log(count.length);
  //console.log(JSON.stringify(req.query.o_start_sandwichType));
  //console.log(JSON.parse(req.query.o_start_sandwichType));
  //console.log(JSON.stringify(req.query.o_start_sandwichType).length);
//  console.log(JSON.parse(req.query.o_start_sandwichType).length);

  //console.log(result);
  console.log("Store the data to database here");

//  Sandwich.count({owner:owner}, function(err,count){
  //for(var i=0; i<count.length;i++){
  //console.log("req.query.o_start_sandwichType: "+ req.query.o_start_quantity[i]);
  //console.log("req.query.o_start_quantity: "+ order_quantity[i]);

//  console.log(JSON.stringify(req.query.o_start_quantity));
//}
//});

  var order = new Order({
                        owner: owner,
                        sandwiches: req.query.o_start_sandwichType,
                        name: "Order"
                      });

  Sandwich.findOneAndUpdate({ _id: req.query.o_start_sandwichType },{quantity: req.query.o_start_quantity});

  order.save(function(err, order){
  resp.sendFile(__dirname + "/order/o_view.html");
  });

});

app.get('/o_view', function (req, resp){
  console.log("in /o_view");
  resp.sendFile(__dirname + "/order/o_view.html");
});

app.get('/editorder', function(req, resp){
  var owner = req.session.user._id;
  Order.findOne({owner:owner},function(err,order){
    console.log(order);
    var sandwiches_array = order.sandwiches;
    console.log(sandwiches_array);
    Sandwich.find({owner:owner, _id:{'$in':sandwiches_array}},function(err, sandwich){
      console.log(sandwich);
      resp.send(sandwich);
    });
  });
});

app.get('/o_edit', function (req, resp){
  console.log("in /o_edit");
  resp.sendFile(__dirname + "/order/o_edit.html");

});

app.get('/o_edit_submit',function(req,resp){
  var owner = req.session.user._id;
  var edit_order = req.query.o_edit_sandwichType;

  Order.findOneAndRemove({owner:owner, name:"Order"}, function(err,order){
  });

  var order = new Order({
                        owner: owner,
                        sandwiches: req.query.o_edit_sandwichType,
                        name: "Order"
                      });

  //Sandwich.findOneAndUpdate({ _id: req.query.o_start_sandwichType },{quantity: req.query.o_start_quantity});

  order.save(function(err, order){
    resp.sendFile(__dirname + "/order/o_view.html");
  });

Order.count({owner:owner}, function(err,count){
    console.log("I am delete order");
    if(count==0){
      Order.findOneAndRemove({owner:owner, name:"Order"}, function(err,order){
      });
    }
});


  /*
  Order.find({owner:owner},function(err,order){
      Order.findOneAndRemove({sandwiches:{'$in':edit_order}},function(err,order){
        console.log("successful remove one sandwich");
        resp.sendFile(__dirname + "/order/o_view.html");
      });
  });
  */
});


app.get('/checkorder', function(req, resp){
  console.log('in check_order_function');
  var owner = req.session.user._id;
  Order.count({owner:owner}, function(err,count){
    console.log("total no. of orders: %d", count);
    if(count >= 1){
      resp.send("1");
    }
    if(count == 0){
      resp.send("0");
    }
  });
});

app.get('/o_delete', function (req, resp){
  console.log("in /o_delete");
  var owner = req.session.user._id;
  //var order_id = req.query.order.name;
  console.log("owner: %s",owner);
  //console.log("order_id: %s", req.query.order.name);

  Order.findOneAndRemove({owner:owner, name:"Order"}, function(err,order){
  //Sandwich.remove(function(err,sandwich){
  //  if (err) return handleError(err);
    console.log("successful remove one order");
    resp.sendFile(__dirname + "/order/o_view.html");
    //resp.redirect('/s_view?sandwich_name='+sandwich_name);
  //});
  });

  //resp.redirect('/s_view?sandwich_name='+sandwich_name);
});

// ^^^^^^^^^^^^^^^ Part for order ^^^^^^^^^^^^^^^ //

app.get('/session', function(req, res){
    if(req.session.user.username !== undefined){
      res.send(req.session.user);
    }
    else res.send("0");
});


app.get('/logout', function(req, resp) {
  req.session.destroy();
  resp.redirect('/');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
