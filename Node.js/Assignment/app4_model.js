const MongoOse = require('mongoose');
var url = "mongodb://localhost:27017/tacademy";
MongoOse.connect(url);
var db = MongoOse.connection;

db.on('error', (err) => {
    console.log('error : ', err);
})
db.on('open', () => {
    console.log('Open event');
})

var MovieScheme = MongoOse.Schema({
    title : String,
    director : String,
    year : Number,
    reviews : [String]
});

MovieScheme.methods.addReview = function(review) {
    this.reviews.push(review);
    return this.save();
}

var Movie = MongoOse.model('Movie', MovieScheme);
module.exports = Movie;