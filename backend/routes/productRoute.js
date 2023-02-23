const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReviews,
  getAdminProducts,
} = require("../controller/productController");
const {
  isAuthenticatedUser,
  authorzeRoles,
} = require("../middleware/authentication");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorzeRoles("admin"), getAdminProducts);
router.route("/admin/product/new").post(isAuthenticatedUser, createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorzeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorzeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReviews);

module.exports = router;
