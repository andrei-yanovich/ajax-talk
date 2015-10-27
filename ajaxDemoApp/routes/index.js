var express = require('express');
var ajax = require('../public/javascripts/ajax');
var router = express.Router();

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { 
        title: 'Here you can try out AJAX',
        ajaxApi: ajax
     });
});

router.get('/echo', function(req, res, next) {
    res.json(req.query);
});
router.post('/echo', function(req, res, next) {
    res.send(req.body);
});

router.get('/jsonp', function(req, res) {
    res.jsonp({ resp: 'response from JSONP' });
});



module.exports = router;