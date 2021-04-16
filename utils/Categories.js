const Category = require('../models/Category');

const getCategories = async (res) => {
  const categories = await Category.find();

  if (categories.length > 0) {
    return res.send(categories);
  }
  return res.status(404).json({ message: 'No data found', success: false });
};

const addCategory = async (category, res) => {
  const { name } = category;
  const categoryFromDb = await Category.findOne({ name });
  if (categoryFromDb) {
    return res
      .status(500)
      .json({ message: 'Category already exists', success: false });
  }
  const newCategory = new Category({ ...category });
  await newCategory
    .save()
    .then(() => {
      return res.status(200).json({
        message: 'Category added',
        success: true,
        body: newCategory._id,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Unable to add Category',
        success: false,
        body: err.message,
      });
    });
};

const deleteCategory = async (category, res) => {
  const { _id } = category;
  await Category.findByIdAndDelete({ _id })
    .then(() => {
      return res
        .status(201)
        .json({ message: 'Category deleted', success: true });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Unable to delete category',
        success: false,
      });
    });
};

const updateCategory = async (category, res) => {
  const { id } = category;
  Category.findByIdAndUpdate({ _id: id }, category, { new: false })
    .then(() => {
      return res
        .status(200)
        .json({ message: 'Category updated successfully', success: true });
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ message: 'Category not found', success: false });
    });
};
module.exports = {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
};
