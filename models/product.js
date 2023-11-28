const mongoose = require('mongoose')

// product schema
const productSchema = new mongoose.Schema({
    ProductName: String,
    priceUSD: String,
    priceCAD: String,
  });
  
module.exports = mongoose.model('Product', productSchema);