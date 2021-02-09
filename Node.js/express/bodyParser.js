const { constant } = require('async');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});


//  body의 JSON을 파싱하기 위한 과정
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.post('/', (req, res) => {
    var title = req.body.title;
    var message = req.body.message;

    res.send('title : ' + title + ' message : ' + message);
});