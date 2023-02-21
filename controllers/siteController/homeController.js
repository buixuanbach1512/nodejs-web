const { Product } = require('../../models/product')
const { Category } = require('../../models/category')
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require('../../util/mongoose')
const mongoose = require('mongoose')

class SiteHomeController {
    async index(req, res) {
        let categories = await Category.find()
        categories = mutipleMongooseToObject(categories)

        let product = await Product.find().sort({"dateCreated": -1}).limit(5)
        product = mutipleMongooseToObject(product)

        let pro_Featured = await Product.find({isFeatured: 'true'}).limit(5)
        pro_Featured = mutipleMongooseToObject(pro_Featured)
        
        const name = req.cookies.user_name;

        const context = {
            categories,
            product,
            pro_Featured,
            name    
        }
        res.render('site/home',context)
    }

    async search(req, res) {
        const page = req.query.page || 1;
        const perPage = 9;
        let search_value = req.query.search;
        let categories = await Category.find()
        categories = mutipleMongooseToObject(categories);

        const name = req.cookies.user_name;

        const postCount = await Product.find({$text: {$search: search_value}}).count();
        
        let search = await Product.find({$text: {$search: search_value}}).skip((perPage * page) - perPage).limit(perPage);
        search = mutipleMongooseToObject(search)

        const context = {
            categories,
            search,
            name,
            current: parseInt(page),
            pages: Math.ceil(postCount / perPage)
        }
        res.render('site/search', context )
    }
}

module.exports = new SiteHomeController()
