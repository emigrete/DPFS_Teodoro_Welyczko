const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();

router.get("/", cartController.showCart);
router.post("/add", cartController.addToCart);
router.post("/delete", cartController.removeFromCart);
router.post("/increase", cartController.increaseQuantity);
router.post("/decrease", cartController.decreaseQuantity);


module.exports = router;
