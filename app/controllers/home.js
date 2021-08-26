const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (_, res) => {
  res.sendFile(path.join(process.env.VIEWS, 'index.html'));
});

module.exports = router;
