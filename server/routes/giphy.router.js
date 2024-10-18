const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get('/search', (req, res) => {
    const apiKey = process.env.GIPHY_API_KEY;

    // Extract the search query
    const searchQuery = req.query.q;

    // Construct the URL with the correct format
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=15&q=${searchQuery}`)
        .then(response => {
            console.log("Data from Giphy:", response.data.data);
            res.send(response.data.data);
        })
        .catch(error => {
            console.log("Server error at /api/giphy/search:", error);
            res.sendStatus(500);
        });
});

module.exports = router;
