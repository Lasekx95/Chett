app.post('/productADD', async (req, res) => {
    try {
      const { productName, priceUSD, priceCAD } = req.body;
  
      const newProduct = new Product({
        productName,
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