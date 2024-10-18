const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  res.sendStatus(200);
});

// add a new favorite
router.post('/', (req, res) => {
  const newGiphy = req.body;
  console.log('Posting Giphy:', newGiphy);
  const queryText = `
    INSERT INTO "favorites"
      ("gif_url")
      VALUES
      ($1);
  `;
  const queryValues = [
    newGiphy.gif_url
  ];
  pool.query(queryText, queryValues)
    .then((result) => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error in POST /api/giphy', err);
      res.sendStatus(500);
    });
  
});

// update a favorite's associated category
router.put('/:id', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/:id', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
