const router = require("express").Router();
const pets = require("../data");

router.post("/", async (req, res, next) => {
    const body = req.body;
    pets.push(body);
    res.status(200).json("Added successfully");
});

module.exports = router;
