const router = require("express").Router();
const {
  userRegistration,
  userLogin,
  userAuth,
  forgotPassword,
} = require("../controllers/users");
const {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} = require("../utils/Categories");
const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../utils/Products");

/**
 * @DESC This is a test api by default
 */
router.get("/", userAuth, async (req, res) => {
  res.send("Hello, Welcome");
});
/**
 * @DESC To register user, pass user information: name, email, password, role, username
 */

router.route("/register").post(userRegistration);

/**
 * @DESC Login with username and password and role is passed
 */

router.route("/login").post(userLogin);
/**
 * @DESC reset password
 */
router.route("/forgotPassword").post(forgotPassword);

/**
 * @DESC Get all categories
 */
router.get("/getCategories", async (req, res) => {
  await getCategories(res);
});

/**
 * @DESC Pass category : name, icon, subtype
 */
router.post("/addCategory", async (req, res) => {
  await addCategory(req.body, res);
});
/**
 * @DESC Delete category based on id
 */
router.post("/deleteCategory", async (req, res) => {
  await deleteCategory(req.body, res);
});

/**
 * @DESC Update category based on id , and pass all the category fields
 */
router.post("/updateCategory", async (req, res) => {
  await updateCategory(req.body, res);
});

/**
 * @DESC Get all products
 */
router.get("/getProducts", async (req, res) => {
  await getProducts(res);
});

/**
 * @DESC Pass products all fields
 *  */
router.post("/addProduct", async (req, res) => {
  await addProduct(req.body, res);
});
/**
 * @DESC Delete product based on id
 */
router.post("/deleteProduct", async (req, res) => {
  await deleteProduct(req.body, res);
});
/**
 * @DESC Update category based on id , and pass all the category fields
 */
router.post("/updateProduct", async (req, res) => {
  await updateProduct(req.body, res);
});

module.exports = router;
