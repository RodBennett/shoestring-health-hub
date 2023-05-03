const express = require("express")
const axios = require("axios")
// const token = process.env.ACCESS_TOKEN;

const router = express.Router();

router.get('/', async (req, res) => {
    const headers = {
        "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await axios.get('https://api.kroger.com/v1/products?filter.term=pretzels&filter.limit=2', { headers });
        console.log(response.data)
        res.status(201).json(response.data)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;

