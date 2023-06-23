const { Router } = require("express");
const ProductController = require("../controllers/ProductController");
const upload = require("../middleware/upload");
const router = Router();

router.get("/product/list", ProductController.index);
router.get("/product/create", ProductController.create);
router.post("/product/store", upload.single("img"), ProductController.store);
router.get("/product/:id/edit", ProductController.edit);
router.post(
    "/product/:id/update",
    upload.single("img"),
    ProductController.update,
);
router.post("/product/delete", ProductController.delete);

router.get("/transaksi", ProductController.transaksi);

module.exports = router;
