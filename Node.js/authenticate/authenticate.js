const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : 'Secret Key'
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/login', handleLogin);
app.get('/personal', showPersonalPage);
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

function handleLogin(req, res) {
    var id = req.body.id;
    var pw = req.body.pw;

    if(id === 'user' && pw === '1234') {
        req.session.userid = id;
        res.send('success');
    }
    else {
        res.send('fail');
    }
}

function showPersonalPage(req, res) {
    var id = req.session.userid;
    if(id) {
        res.send('Private Page for ' + id);
    }
    else {
        res.sendStatus(401);
    }
}