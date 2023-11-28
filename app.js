const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const bodyParser = require('body-parser');
const app = express()
const port = 4050;

// view engine setup
app.set('view engine', 'ejs');
app.set('views', 'views')
app.set('layout', 'layout/main')

app.use(bodyParser.urlencoded({ extended: false }));

//mongoose.connect('mongodb://localhost/chett', { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', (req, res) => {
    res.render('home'); 
  });

  app.get('/customers', (req, res) => {
    res.render('customers'); 
  });

  app.get('/products', (req, res) => {
    res.render('products'); 
  });

  app.get('/customer', (req, res) => {
    res.render('customerlayout'); 
  });

  app.get('/newproduct', (req, res) => {
    res.render('newproduct'); 
  });

  connectToMongoDb().then(() => {
    app.listen(port, () => {
        console.log(
            `App listening for connections on http://localhost:${port}`
        )
    })
})

async function connectToMongoDb() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chett')
}