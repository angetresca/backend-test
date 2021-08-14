const express = require("express");
const routes = require("./routes");


// Create express app
const app = express();


app.use(express.json());

// Routes
app.use("/", routes());

// Host and port
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || "3000";
app.listen(port, host, () => {
    console.log("El servidor está funcionando");
});
