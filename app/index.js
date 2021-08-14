require("dotenv").config();  // Configures reading the .env file
require("./mongo");  // DB connection
const express = require("express");
const routes = require("./routes");
const handleErrors = require("./middlewares/handleErrors");
const notFound = require("./middlewares/notFound");

// Create express app
const app = express();

// Body parser middleware
app.use(express.json());

// Router middleware
app.use("/", routes());

// Route not found middleware
app.use(notFound);

// Error handler middleware
app.use(handleErrors);

// Host and port
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || "3000";
app.listen(port, host, () => {
    console.log("El servidor está funcionando");
});
