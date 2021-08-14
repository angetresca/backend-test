const express = require("express");
const routes = require("./routes");


// Create express app
const app = express();


// Body parser middleware
app.use(express.json());

// Routes middleware
app.use("/", routes());

// Route not found middleware
app.use((req, res) => {
    res.status(404).json({error: "Not found"});
});

// Host and port
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || "3000";
app.listen(port, host, () => {
    console.log("El servidor está funcionando");
});
