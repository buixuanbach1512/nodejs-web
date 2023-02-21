const express = require('express');
const router = express.Router();

const siteCheckOutController = require('../../controllers/siteController/checkoutController');

router.get('/', siteCheckOutController.index);
router.post('/', siteCheckOutController.order);

// router.get('/add/:id', siteCartController.addCart)

module.exports = router;