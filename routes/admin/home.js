const express = require('express');
const router = express.Router();

const adminHomeController = require('../../controllers/adminController/homeController');

router.get('/', adminHomeController.index);

module.exports = router;