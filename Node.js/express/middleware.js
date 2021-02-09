const express = require('express');
var app = express();

app.use((req, res, next) => {
    var now = new Date();
    console.log(now.toDateString() + ' - url : ' + req.url);
    next();
});

app.use((req, res) => {
    res.send('Hello Express');
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});