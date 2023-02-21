const { Product } = require('../../models/product')
const { Category } = require('../../models/category')
const { Order } = require('../../models/order')
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require('../../util/mongoose')
const mongoose = require('mongoose')
const { OrderItem } = require('../../models/orderItem')

class AdminOrderController {
    async index(req, res) {
        let orders = await Order.find().populate('user')
        orders = mutipleMongooseToObject(orders)
        res.render('admin/order/list', { layout: 'admin-main', orders })
    }

    destroy(req, res) {
        Order.findByIdAndRemove(req.params.id)
            .then((order) => {
                if (order) {
                    return res.redirect('back')
                } else {
                    return res
                        .status(404)
                        .json({ success: false, message: 'order not found' })
                }
            })
            .catch((err) => {
                return res.status(400).json({ success: false, error: err })
            })
    }

    async status(req, res) {

        let order = await Order.findById(req.params.id)
        order = mongooseToObject(order)
        res.render('admin/order/set-status', {layout: 'admin-main', order})
    }

    async detail(req, res) {
        let orderItem = await Order.findById(req.params.id).populate({
            path: 'orderItems', populate : {path : 'product'}
        })
        let orderItems = orderItem.orderItems;

        orderItem = mongooseToObject(orderItem);
        orderItems = mutipleMongooseToObject(orderItems);

        const context = {
            layout: 'admin-main',
            orderItem,
            orderItems
        }

        res.render('admin/order/order-item', context )
    }

    async updateStatus(req, res) {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid Order Id')
        }

        const order = await Order.updateOne(
            { _id: req.params.id },
            {
                status: req.body.status,
            }
        )

        if (!order)
            return res.status(500).send('The product cannot be updated !!')

        res.redirect('/admin/order')
    }
}

module.exports = new AdminOrderController()
