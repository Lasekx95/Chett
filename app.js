import express from "express";

const app = express();
const port = 4050;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Welcome to my server!');
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });