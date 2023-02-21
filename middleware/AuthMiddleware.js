const {User} = require('../models/user')
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require('../util/mongoose')

module.exports.requireAuth = async function(req, res, next) {
    if(!req.cookies.isAdmin){
        res.redirect('/me/login');
        return;
    }else if(req.cookies.isAdmin == 0){
        res.redirect('/me/login');
        return;
    }

    let user = await User.find({_id : req.cookies.idUser})

    if(!user){
        res.redirect('/me/login');
        return;
    }
    

    next();
}