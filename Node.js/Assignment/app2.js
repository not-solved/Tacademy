const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(require('./app2_movieRouter'));

app.get('/', (req, res) => {
    res.end('Welcome to movie app');
})
app.use(handleError);
function handleError(err, req, res, next) {
    console.log('Error : ', err);
    res.status(err.code).send({msg:err.message});
}

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})