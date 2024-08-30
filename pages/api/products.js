// const express = require('express');
// const mongoose = require('mongoose');
// const router = express.Router();

// // Define Product model
// const Product = mongoose.model('Product', new mongoose.Schema({
//   name: String,
//   price: Number,
//   code: String,
//   image: String
// }));

// router.get('/products', async (req, res) => {
//   const {
//     categories = '',
//     minPrice = 0,
//     maxPrice = 1000000,
//     sortBy = 'name',
//     page = 1,
//     itemsPerPage = 10
//   } = req.query;

//   try {
//     const filters = {
//       name: { $in: categories.split(',').filter(c => c) },
//       price: { $gte: Number(minPrice), $lte: Number(maxPrice) }
//     };

//     const sortOptions = {};
//     if (sortBy === 'priceAsc') sortOptions.price = 1;
//     else if (sortBy === 'priceDesc') sortOptions.price = -1;
//     else if (sortBy === 'newest') sortOptions._id = -1;
//     else if (sortBy === 'oldest') sortOptions._id = 1;
//     else sortOptions.name = 1;

//     const products = await Product.find(filters)
//       .sort(sortOptions)
//       .skip((Number(page) - 1) * Number(itemsPerPage))
//       .limit(Number(itemsPerPage))
//       .exec();

//     const totalProducts = await Product.countDocuments(filters);

//     res.json({
//       products,
//       totalProducts,
//       totalPages: Math.ceil(totalProducts / Number(itemsPerPage))
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
