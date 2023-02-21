const { Product } = require('../../models/product')
const { Category } = require('../../models/category')
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require('../../util/mongoose')
const mongoose = require('mongoose');

class SiteProductController {
    async index(req, res) {
        const id = req.params.id;
        const page = req.query.page || 1;
        const perPage = 9;

        let categories = await Category.find()
        categories = mutipleMongooseToObject(categories)

        const name = req.cookies.user_name;

        let category = await Category.findById(id)
        category = mongooseToObject(category)

        let productList = await Product.find({category: id}).populate('category').skip((perPage * page) - perPage).limit(perPage);
        productList = mutipleMongooseToObject(productList);

        const postCount = await Product.find({category: id}).populate('category').count()

        const context = {
            categories,
            productList,
            name,
            category,
            current: parseInt(page),
            pages: Math.ceil(postCount / perPage)
        }
        res.render('site/product', context)
    }

    async show_detail(req, res) {

        let categories = await Category.find()
        categories = mutipleMongooseToObject(categories)

        const id = req.params.id;
        let product = await Product.findOne({_id : id}).populate('category');
        product = mongooseToObject(product);

        const name = req.cookies.user_name;

        res.render('site/product_detail', {product, name, categories})
    }
}

module.exports = new SiteProductController()
