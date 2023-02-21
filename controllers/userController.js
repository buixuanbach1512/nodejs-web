const { User } = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
    async login(req, res) {
        res.render('site/login', { layout: 'sign-main' })
    }

    async register(req, res) {
        res.render('site/register', { layout: 'sign-main' })
    }

    async save_user(req, res) {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            address: req.body.address,
            phone: req.body.phone,
        })
        user = await user.save()
        res.redirect('/me/login')
    }

    async login_post(req, res) {
        const user = await User.findOne({ name: req.body.name })
        if (!user) {
            return res.status(400).send('Not found!!')
        }

        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            res.cookie('idUser', user.id);
            res.cookie('user_name', user.name);
            res.cookie('isAdmin', user.isAdmin);
            res.redirect('/')
        } else {
            res.status(400).send('password is wrong')
        }
    }

    async logout(req, res)  {
        for (let cookie of Object.keys(req.cookies)) {
            res.clearCookie(cookie)
        }
        res.redirect('/')
    }
}

module.exports = new UserController()
