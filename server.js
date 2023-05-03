const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const routes = require("./routes")

app.use("/", routes)

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});