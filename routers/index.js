const { Router } = require("express");
const HomeController = require("../controllers/HomeController");
const AuthController = require("../controllers/AuthController");
const productRouter = require("./product.router");
const categoryRouter = require("./category.router");
const auth = require("../middleware/auth");
const router = Router();

router.get("/login", AuthController.login);
router.get("/register", AuthController.register);
router.post("/register/post", AuthController.storeRegister);
router.post("/prosesLogin", AuthController.prosesLogin);

router.use(auth);
router.get("/", HomeController.index);
router.use(productRouter);
router.use(categoryRouter);

module.exports = router;
