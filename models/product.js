// product schema
const productSchema = new mongoose.Schema({
    productName: String,
    priceUSD: String,
    priceCAD: String,
  });
  
module.exports = mongoose.model('Product', productSchema);