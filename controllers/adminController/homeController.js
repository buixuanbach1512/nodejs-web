const { Product } = require('../../models/product')
const { Category } = require('../../models/category')
const { Order } = require('../../models/order')
const { User } = require('../../models/user')
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require('../../util/mongoose')
const mongoose = require('mongoose')

class AdminHomeController {
    async index(req, res) {
        const userCount = await User.find().count()
        const productCount = await Product.find().count()
        const orderCount = await Order.find().count()

        let user = await User.find().sort({"dateCreated": -1})
        user = mutipleMongooseToObject(user)

        let order = await Order.find().populate("user")
        order = mutipleMongooseToObject(order)

        const context = {
            layout: 'admin-main',
            userCount,
            productCount,
            orderCount,
            user, order
        }
        res.render('admin/home', context)
    }
}

module.exports = new AdminHomeController()
