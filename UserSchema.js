var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  username: String,
  password: String,
  sandwiches: [{
    type: Schema.Types.ObjectId,
    ref: 'Sandwich'
  }]
});
module.exports = mongoose.model('User', UserSchema);

var User = mongoose.model('User');
/*var userA = new User({
  name: 'a',
  username: 'aa',
  password: 'a',
  sandwiches: null
});
userA.save();

var userB = new User({
  name: 'b',
  username: 'bb',
  password: 'b',
  sandwiches: null
});
userB.save();

var userC = new User({
  name: 'c',
  username: 'cc',
  password: 'c',
  sandwiches: null
});
userC.save();
*/
