const { Router } = require("express");

const shoeRouter = require("./shoe.router");

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ msg: "Server connected" });
});

router.use(shoeRouter);

module.exports = router;