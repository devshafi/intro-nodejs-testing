const router = require("express").Router();
const pets = require("../data");
const Pet = require("../models/pet");

// Middleware to authenticate the routes
function authenticate(req, res, next) {
    let token = req.headers.authorization;

    if (typeof token === "string" && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }

    if (!token || token !== "valid-token") {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // access is authenticated
    next();
}

router.post("/", authenticate, async (req, res, next) => {
    const body = req.body;
    const { name, type } = body;
    if (!name || !type) {
        res.status(400).json("Bad Request");
        return;
    }
    await Pet.create(body);
    res.status(201).json("Added successfully");
});

router.get("/", async (req, res, next) => {
    res.status(200).json(pets);
});

module.exports = router;
