var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    sandwiches: [{
      type: Schema.Types.ObjectId,
      ref: 'Sandwich'
    }],
    name: String
});


module.exports = mongoose.model('Order', OrderSchema);
