// models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number },
  code: { type: String, default: '' }
}, {
  collection: 'product' // Nama koleksi di database
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
