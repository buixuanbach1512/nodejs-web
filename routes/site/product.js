const express = require('express');
const router = express.Router();

const siteProductController = require('../../controllers/siteController/productController');

router.get('/:id', siteProductController.index);
router.get('/detail/:id', siteProductController.show_detail);

module.exports = router;