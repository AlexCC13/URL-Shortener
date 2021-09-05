const express = require('express');
const router = express.Router();

//@route GET /api/shorten/test
//@description Test API
router.get('/test', (req, res) => res.json('API is working'));

//@route GET api/redirect
//@description Redirect user

router.get('/', (req, res) => {
    const hash = req.headers.hash;

    URL.findOne({ id: hash })
        .then((doc) => {
            return res.json({ url: doc.url })
        })
        .catch((err) => {
            return res.status(400).json({error: 'This link may have expired.'});
        })
});

module.exports = router;