const adminHomeRoute = require('./admin/home');
const adminProductRoute = require('./admin/products');
const adminCategoryRoute = require('./admin/categories');
const adminOrderRoute = require('./admin/order')

const siteHomeRoute = require('./site/home');
const siteProductRoute = require('./site/product');
const siteCartRoute = require('./site/cart');
const siteCheckOutRoute = require('./site/checkout');


const UserRoute = require('./user');

const middlewareAuth = require('../middleware/AuthMiddleware')

function route(app) {
  // Site Route
  app.use('/',siteHomeRoute);
  app.use('/products', siteProductRoute);
  app.use('/me', UserRoute);
  app.use('/cart', siteCartRoute);
  app.use('/checkout', siteCheckOutRoute);


  // Admin Route
  app.use('/admin/products', adminProductRoute )
  app.use('/admin/categories', adminCategoryRoute )
  app.use('/admin/order', adminOrderRoute )
  app.use('/admin',middlewareAuth.requireAuth, adminHomeRoute);

}

module.exports = route;