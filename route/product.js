const express = require("express");
const {
  fetchProduct,
  storeProduct,
  updateProduct,
  removeProduct,
} = require("../controller/product");
const router = express.Router();
const {
  checkAuthenctication,
  isSeller,
} = require("../middleware/checkAuthentication");

router.get("/", fetchProduct);
router.post("/", checkAuthenctication, isSeller, storeProduct);
router.put("/:id", checkAuthenctication, isSeller, updateProduct);
router.delete("/:id", checkAuthenctication, isSeller, removeProduct);

module.exports = router;
