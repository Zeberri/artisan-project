const express = require('express');
const router = express.Router();

const {landingPage, searchArtisanByJobByLocation, } = require('../controller/cController');

router.get('/', landingPage);
router.post('/search', searchArtisanByJobByLocation);





module.exports = router;