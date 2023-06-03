const router = require("express").Router();
const pets = require("../data");
const Pet = require("../models/pet");

router.post("/", async (req, res, next) => {
    const body = req.body;
    const { name, type } = body;
    if (!name || !type) {
        res.status(400).json("Bad Request");
        return;
    }
    await Pet.create(body)
    res.status(201).json("Added successfully");
});

router.get("/", async (req, res, next) => {
    res.status(200).json(pets);
});

module.exports = router;
