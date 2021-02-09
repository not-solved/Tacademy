const express = require('express');
const morgan = require('morgan');
const app = express();

//  morgan - 로깅 미들웨어
app.use(morgan('dev'));
app.get('/hello', (req, res) => {
    res.send('GET request, /');
});
app.get('/movies', (req, res) => {
    res.send('GET request, /movies');
});
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
})