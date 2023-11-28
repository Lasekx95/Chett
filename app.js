import express from "express";

const app = express();
const port = 4050;

// view engine setup
app.set('view engine', 'ejs');
app.set('views', 'views')
app.set('layout', 'layout/main')

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});