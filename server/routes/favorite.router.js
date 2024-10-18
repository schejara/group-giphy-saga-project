const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
//  res.sendStatus(200);
const sqlText = `SELECT * FROM "favorites"
ORDER BY "id";`
pool.query(sqlText).then((result) => {
  res.send(result.rows)
}).catch((err) => {
  console.error('Error Server Side Get', err);
})

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
  const giphyId = req.params.id 
  const categoryId = req.body.categoryId
  const queryParams = [categoryId, giphyId]

  const sqlText = `UPDATE "favorites"
SET "category_id" = $1
FROM "categories"
WHERE "favorites"."id" = $2;`

pool.query(sqlText, queryParams).then((result) => {
  res.sendStatus(201);
}).catch((err) => {
  console.error('Error Server PUT', err)
})


});

// delete a favorite
router.delete('/:id', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
