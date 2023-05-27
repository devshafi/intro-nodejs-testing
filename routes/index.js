const router = require("express").Router();
const petRoute = require("./pet");
router.use("/pet", petRoute);

module.exports = router;
