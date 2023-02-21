const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname) )
    }
})

const upload = multer({storage: storage})


const productController = require('../../controllers/adminController/productController');

router.get('/create', productController.create);
router.post('/store', upload.single("image") ,productController.store);
router.get('/:id/update', productController.update);
router.put('/:id',upload.single("image"), productController.edit);
router.get('/:id/delete', productController.destroy);
router.get('/', productController.index);

module.exports = router;