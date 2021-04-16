const router = require('express').Router();
const { userRegistration, userLogin } = require('../utils/UserAuth');
const {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} = require('../utils/Categories');
const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} = require('../utils/Products');

/**
 * @DESC This is a test api by default
 */
router.get('/', async (req, res) => {
  res.send('Hello, Welcome');
});
/**
 * @DESC To register user, pass user information: name, email, password, role, username
 */
router.post('/register', async (req, res) => {
  await userRegistration(req.body, req.body.role, res);
});

/**
 * @DESC Login with username and password and role is passed
 */

router.post('/login', async (req, res) => {
  await userLogin(req.body, res);
});

/**
 * @DESC Get all categories
 */
router.get('/getCategories', async (req, res) => {
  await getCategories(res);
});

/**
 * @DESC Pass category : name, icon, subtype
 */
router.post('/addCategory', async (req, res) => {
  await addCategory(req.body, res);
});
/**
 * @DESC Delete category based on id
 */
router.post('/deleteCategory', async (req, res) => {
  await deleteCategory(req.body, res);
});

/**
 * @DESC Update category based on id , and pass all the category fields
 */
router.post('/updateCategory', async (req, res) => {
  await updateCategory(req.body, res);
});

/**
 * @DESC Get all products
 */
router.get('/getProducts', async (req, res) => {
  await getProducts(res);
});

/**
 * @DESC Pass products all fields
 *  */
router.post('/addProduct', async (req, res) => {
  await addProduct(req.body, res);
});
/**
 * @DESC Delete product based on id
 */
router.post('/deleteProduct', async (req, res) => {
  await deleteProduct(req.body, res);
});
/**
 * @DESC Update category based on id , and pass all the category fields
 */
router.post('/updateProduct', async (req, res) => {
  await updateProduct(req.body, res);
});

module.exports = router;
