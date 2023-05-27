const express = require("express");
const routes = require("./routes");

const app = express();
app.use(express.json());

app.use("/api", routes);

app.listen("8080", () => {
    console.log("Server is up and running");
});

module.exports = app;
