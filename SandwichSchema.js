var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var SandwichSchema = new Schema({
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String,
    breadtype: String,
    size: String,
    vegetable: String,
    meat: String,
    cheese: String,
    source: String,
    comment: String,
    edit: String,
    quantity: String
});


module.exports = mongoose.model('Sandwich', SandwichSchema);
