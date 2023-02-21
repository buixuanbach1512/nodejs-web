const { Product } = require('../../models/product')
const { Category } = require('../../models/category')
const Cart = require('../../models/cart')
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require('../../util/mongoose')
const mongoose = require('mongoose')

class SiteCartController {
    async index(req, res) {
        let categories = await Category.find()
        categories = mutipleMongooseToObject(categories)

        let products = await Product.find()
        products = mutipleMongooseToObject(products)

        const name = req.cookies.user_name

        if (!req.session.cart) {
            return res.render('site/cart', {
                products: null,
            })
        }

        const cart = new Cart(req.session.cart)
        console.log(cart.getItems)

        const context = {
            categories,
            name,
            products: cart.getItems(),
            totalPrice: cart.totalPrice,
        }
        res.render('site/cart', context)
    }

    async addCart(req, res) {
        const productId = req.params.id
        const cart = new Cart(req.session.cart ? req.session.cart : {})

        Product.findById(productId, function (err, product) {
            if (err) {
                return res.redirect('/')
            }
            cart.add(product, product.id)
            req.session.cart = cart
            res.redirect('/')
        })
    }

    async remove(req, res) {
        const productId = req.params.id;
        const cart = new Cart(req.session.cart ? req.session.cart : {});

        cart.remove(productId);
        req.session.cart = cart;
        res.redirect('/cart');
    }
}

module.exports = new SiteCartController()
