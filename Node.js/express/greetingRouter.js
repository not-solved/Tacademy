const express = require('express');
const router = express.Router();

router.get('/hello', sayHello);
router.get('/howAreYou/:who', sayThankYou);

function sayHello (req, res) {
    res.send('Hello Router');
}
function sayThankYou (req, res) {
    var who = req.params.who;
    res.send('Fine Thank You ' + who + "! And You?");
}

//  외부에서 사용할 수 있도록 router라는 이름으로 export 함
module.exports = router;