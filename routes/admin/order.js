const express = require('express');
const router = express.Router();
const path = require('path')

const orderController = require('../../controllers/adminController/orderController');

router.get('/', orderController.index);
router.get('/:id/delete', orderController.destroy);
router.get('/:id/update', orderController.status);
router.get('/:id/detail', orderController.detail);

router.put('/:id', orderController.updateStatus);



module.exports = router;