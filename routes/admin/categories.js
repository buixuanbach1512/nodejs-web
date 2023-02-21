const express = require('express');
const router = express.Router();
const path = require('path')

const categoryController = require('../../controllers/adminController/categoryController');

router.get('/create', categoryController.create);
router.post('/store', categoryController.store);
router.get('/:id/update', categoryController.update);
router.put('/:id', categoryController.edit);
router.get('/:id/delete', categoryController.destroy);
router.get('/', categoryController.index);

module.exports = router;