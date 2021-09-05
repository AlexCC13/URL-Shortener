const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const URL = require('./models/Urls');

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use(cors());

app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })
   
  app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
  })

const db = require('./config/keys').mongoURI

mongoose.connect(db)
    .then(() => console.log('MongoDB Connected..'))
    .catch(err => console.log(err));


//Routes
const shorten = require('./routes/api/shorten');
app.use('/api/shorten', shorten);

const redirect = require('./routes/api/redirect');
const router = require('./routes/api/shorten');
app.use('/api/redirect', redirect);

app.get('/:hash', (req, res) => {
    const id = req.params.hash;
    URL.findOne({ id: id}, (err, doc) => {
        if(doc) {
            console.log(doc.url);
            res.redirect(doc.url);
        } else {
            res.redirect('/');
        }
    });
})

app.get('/', (req, res) => {
    res.send('Hello');
})

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server is running on port ${port}`));