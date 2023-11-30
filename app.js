const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const bodyParser = require('body-parser');
const app = express()
const port = 4050;

const Product = require('./models/product'); //importing productSchema from models folder
const customer = require('./models/customer'); //importing customerSchema from models folder

//middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: false }));


// view engine setup
app.set('view engine', 'ejs'); //set the view engine to ejs
app.set('views', 'views') //set the views directory
app.set('layout', 'layout/main') //set the layout directory

//product controllers
app.post('/productADD', async (req, res) => { //post request to add product
  try {
    const { ProductName, priceUSD, priceCAD } = req.body; //destructure the request body

    const newProduct = new Product({ //create a new product
      ProductName,
      priceUSD,
      priceCAD,
    });

    await newProduct.save(); //save the product to the database

    res.redirect('/products'); //redirect to the products page
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/products', async (req, res) => { //get request to display products
  try {
    const products = await Product.find();
    res.render('products', { products }); //render the products page
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/editProduct/:id', async (req, res) => { //get request to edit product by id
  try {
    const productId = req.params.id; //get the product id from the request parameters
    const product = await Product.findById(productId); //find the product by id
    res.render('editProduct', { product }); //render the edit product page
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/editProduct/:id', async (req, res) => { //post request to edit product by id 
  try {
    const productId = req.params.id; //get the product id from the request parameters
    const { productName, priceUSD, priceCAD } = req.body; //destructure the request body

    // Update the product in the database
    await Product.findByIdAndUpdate(productId, { //find the product by id and update it
      ProductName: productName,
      priceUSD: priceUSD,
      priceCAD: priceCAD,
    });

    res.redirect('/products'); //redirect to the products page
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/deleteProduct/:id', async (req, res) => { //get request to delete product by id
  try {
    const productId = req.params.id;
    await Product.findByIdAndRemove(productId); //find the product by id and remove it
    res.redirect('/products'); //redirect to the products page
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