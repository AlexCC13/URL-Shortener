const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');
const validUrl = require('valid-url');


const URL = require('../../models/Urls');

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

//@route GET /api/shorten/test
//@description Test API
router.get('/test', (req, res) => res.json('API is working'));

//@route POST api/shorten
//@description Post a URL to shorten
router.post('/', (req, res) => {
    console.log(req.body);
    if (req.body.url) {
        urlData = req.body.url;
    }
    console.log('Url is: ', urlData);
    //check if URL already exists
    if (validUrl.isUri(urlData)) {
        URL.findOne({ url: urlData }, (err, doc) => {
            if (doc) {
                console.log('Entry found in database.');
            } else {
                console.log('This is a new URL');
                const webadress = new URL({
                    id: uniqid(),
                    url: urlData,
                });
                webadress.save((err) => {
                    if (err) {
                        return console.error(err);
                    }
                    res.send({
                        url: urlData,
                        hash: webadress.id,
                    });
                });
            }
        });
    } else {
        res.status(401).json('Invalid long url');
    }
});

module.exports = router;
