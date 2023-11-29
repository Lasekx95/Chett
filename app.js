const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const bodyParser = require('body-parser');
const app = express()
const port = 4050;

const Product = require('./models/product');

//middleware
app.use(bodyParser.urlencoded({ extended: false }));


// view engine setup
app.set('view engine', 'ejs');
app.set('views', 'views')
app.set('layout', 'layout/main')

//product controllers
app.post('/productADD', async (req, res) => {
  try {
    const { ProductName, priceUSD, priceCAD } = req.body;

    const newProduct = new Product({
      ProductName,
      priceUSD,
      priceCAD,
    });

    await newProduct.save();

    res.redirect('/products');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products', { products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/editProduct/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    res.render('editProduct', { product });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/editProduct/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const { productName, priceUSD, priceCAD } = req.body;

    // Update the product in the database
    await Product.findByIdAndUpdate(productId, {
      ProductName: productName,
      priceUSD: priceUSD,
      priceCAD: priceCAD,
    });

    res.redirect('/products');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/deleteProduct/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndRemove(productId);
    res.redirect('/products');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


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