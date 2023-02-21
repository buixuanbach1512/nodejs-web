const express = require('express');
const router = express.Router();

const siteHomeController = require('../../controllers/siteController/homeController');

router.get('/', siteHomeController.index);
router.get('/s1', siteHomeController.search);

module.exports = router;