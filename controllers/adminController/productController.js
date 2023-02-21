const { Product } = require('../../models/product')
const { Category } = require('../../models/category')
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require('../../util/mongoose')
const mongoose = require('mongoose')

class AdminProductController {
    // [GET] admin/products
    async index(req, res) {
        let filter = {}
        if (req.query.categories) {
            filter = { category: req.query.categories.split(',') }
        }
        let products = await Product.find(filter).populate('category')
        products = mutipleMongooseToObject(products)

        res.render('admin/products/list', { layout: 'admin-main', products })
    }

    // [GET] admin/products/create
    async create(req, res) {
        let categories = await Category.find()
        categories = mutipleMongooseToObject(categories)
        res.render('admin/products/create', {
            layout: 'admin-main',
            categories,
        })
    }

    // [POST] admin/products/store
    async store(req, res) {
        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            image: req.file.filename,
            brand: req.body.brand,
            color: req.body.color,
            price: req.body.price,
            category: req.body.category,
            quantity: req.body.quantity,
            numReViews: req.body.numReViews,
            isFeatured: req.body.isFeatured,
        })
        product = await product.save()
        if (!product) {
            return res.status(500).send('The product cannot be created !!')
        }

        res.redirect('/admin/products')
    }

    // [GET] admin/products/:id/update
    async update(req, res) {
        let categories = await Category.find()
        categories = categories.map((categories) => categories.toObject())
        const id = req.params.id

        let product = await Product.findById(id)
        product = mongooseToObject(product)
        res.render('admin/products/update', {
            layout: 'admin-main',
            categories,
            product,
        })
    }

    // [PUT] admin/products/:id
    async edit(req, res) {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid Product Id')
        }

        const category = await Category.findById(req.body.category)
        if (!category) return res.status(400).send('Invalid Category')

        const product = await Product.updateOne(
            { _id: req.params.id },
            {
                name: req.body.name,
                description: req.body.description,
                image: req.file.filename,
                brand: req.body.brand,
                color: req.body.color,
                price: req.body.price,
                category: req.body.category,
                quantity: req.body.quantity,
                numReViews: req.body.numReViews,
                isFeatured: req.body.isFeatured,
            },
            { new: true }
        )

        if (!product)
            return res.status(500).send('The product cannot be updated !!')

        res.redirect('/admin/products')
    }

    // [DELETE] admin/products/:id
    destroy(req, res) {
        Product.findByIdAndRemove(req.params.id)
            .then((product) => {
                if (product) {
                    return res.redirect('back')
                } else {
                    return res
                        .status(404)
                        .json({ success: false, message: 'Product not found' })
                }
            })
            .catch((err) => {
                return res.status(400).json({ success: false, error: err })
            })
    }
}

module.exports = new AdminProductController()
