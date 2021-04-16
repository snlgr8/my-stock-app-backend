const Product = require('../models/Product');

const getProducts = async (res) => {
  const products = await Product.find();

  if (products.length > 0) {
    return res.send(products);
  }
  return res.status(404).json({ message: 'No data found', success: false });
};

const addProduct = async (product, res) => {
  const { name } = product;

  const productFromDb = await Product.findOne({ name });
  if (productFromDb) {
    return res
      .status(500)
      .json({ message: 'Product already exists', success: false });
  }

  const newProduct = new Product({ ...product });
  await newProduct
    .save()
    .then(() => {
      return res.status(200).json({
        message: 'Product added',
        success: true,
        body: newProduct._id,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Unable to add product',
        success: false,
        body: err.message,
      });
    });
};

const deleteProduct = async (_id, res) => {
  await Product.findByIdAndDelete({ _id })
    .then(() => {
      return res
        .status(201)
        .json({ message: 'Product deleted', success: true });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Unable to delete Product',
        success: false,
      });
    });
};

const updatProduct = async (product, res) => {
  const { id } = product;
  Product.findByIdAndUpdate({ _id: id }, product, { new: false })
    .then(() => {
      return res
        .status(200)
        .json({ message: 'Product updated successfully', success: true });
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ message: 'Product not found', success: false });
    });
};
module.exports = {
  deleteProduct,
  getProducts,
  addProduct,
  updatProduct,
};
