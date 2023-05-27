const router = require("express").Router();
const pets = require("../data");

router.post("/", async (req, res, next) => {
    const body = req.body;
    const { name, type } = body;
    if (!name || !type) {
        res.status(400).json("Bad Request");
        return;
    }

    pets.push(body);
    res.status(201).json("Added successfully");
});

module.exports = router;
