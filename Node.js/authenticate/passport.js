const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const session = require('express-session');
app.use(session({       // 세션 설정
    resave: false,              //  자동저장 off
    saveUninitialized: false,   //  초기화 이전 자동값 저장 off
    secret: 'Secret Key'
}));

var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

var LocalStrategy = require('passport-local').Strategy;
var strategy = new LocalStrategy((username, password, done) => {
    if(username === 'user' && password === '1234') {
        var userInfo = {name: '사용자', email: 'user@mail.com'};
        done(null, userInfo);
    }
    else {
        done(null, false, '로그인 실패');
    }
});
passport.use(strategy);

passport.serializeUser((user, done) => {
    console.log('세션에 기록');
    done(null, user);
});
passport.deserializeUser((user, done) => {
    console.log('세션에서 사용자 정보 읽기');
    done(null, user);
});

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.send('success');
});
app.get('/personal', (req, res) => {
    if(req.user) {
        res.send('Pseronal Page : ' + req.user.name);
    }
    else {
        res.sendStatus(401);
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})