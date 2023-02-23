const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrders,
} = require("../controller/orderController");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorzeRoles,
} = require("../middleware/authentication");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorzeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorzeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorzeRoles("admin"), deleteOrders);

module.exports = router;
