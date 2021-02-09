const express = require('express');
var app = express();

//  라우팅
app.use(require('./greetingRouter'));

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
