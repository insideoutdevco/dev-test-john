const express = require('express');
const router = express.Router();
const tasks = require('../services/tasks');

/* GET tasks. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await tasks.getAll(req.query.page, req.query.limit, req.query.topic, req.query.sortBy, req.query.order));
  } catch (err) {
    console.error(`Error while getting tasks `, err.message);
    next(err);
  }
});

module.exports = router;