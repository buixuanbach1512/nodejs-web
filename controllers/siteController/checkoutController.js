const { Product } = require('../../models/product')
const { Category } = require('../../models/category')
const Cart = require('../../models/cart')
const { Order } = require('../../models/order')
const  { OrderItem }  = require('../../models/orderItem')
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require('../../util/mongoose')
const mongoose = require('mongoose')

class SiteCheckOutController {
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

        const context = {
            categories,
            name,
            products: cart.getItems(),
            totalPrice: cart.totalPrice,
        }
        res.render('site/checkout', context)
    }

    async order(req, res) {
        const cart = new Cart(req.session.cart)
        const orderItemsIds = Promise.all(cart.getItems().map(async (orderItem) =>{
            let newOrderItem = new OrderItem({
                quantity: orderItem.quantity,
                product: orderItem.item
            })
    
            newOrderItem = await newOrderItem.save();
    
            return newOrderItem._id;
        }))
        const orderItemsIdsResolved =  await orderItemsIds;
    
        const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
            const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
            const totalPrice = orderItem.product.price * orderItem.quantity;
            return totalPrice
        }))
    
        const totalPrice = totalPrices.reduce((a,b) => a +b , 0);
    
        let order = new Order({
            orderItems: orderItemsIdsResolved,
            shippingAddress: req.body.address,
            phone: req.body.phone,
            totalPrice: totalPrice,
            user: req.cookies.idUser,
        })
        order = await order.save();
    
        if(!order){
            return res.status(400).send('the order cannot be created!');
        }else{
            req.session.destroy()
            res.redirect('/');
        }

    }

    
}

module.exports = new SiteCheckOutController()
