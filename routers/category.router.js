const { Router } = require("express");
const CategoryController = require("../controllers/CategoryController");

const router = Router();

router.get("/category/list", CategoryController.index);
router.get("/category/create", CategoryController.create);
router.post("/category/store", CategoryController.store);
router.get("/category/:id/edit", CategoryController.edit);
router.post("/category/:id/update", CategoryController.update);
router.post("/category/delete", CategoryController.delete);

module.exports = router;
