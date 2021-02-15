const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(require('./app4_movieRouter'));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})