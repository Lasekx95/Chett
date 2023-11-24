import express from "express";

const app = express();
const port = 4050;

// view engine setup
app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set('views', 'views')
app.set('layout', 'layout/main')

app.get('/', (req, res) => {
    res.render('home'); 
  });

  app.get('/accounts', (req, res) => {
    res.render('accounts'); 
  });

  app.get('/pricing', (req, res) => {
    res.render('pricing'); 
  });

  app.get('/data', (req, res) => {
    res.render('data'); 
  });
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});