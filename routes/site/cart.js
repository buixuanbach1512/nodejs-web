const express = require('express');
const router = express.Router();

const siteCartController = require('../../controllers/siteController/cartController');

router.get('/', siteCartController.index);

router.get('/add/:id', siteCartController.addCart)

router.get('/remove/:id', siteCartController.remove)

module.exports = router;