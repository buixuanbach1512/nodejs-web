const {Category} = require('../../models/category')
const {mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose')
const mongoose = require('mongoose')


class AdminCategoryController {
    // [GET] admin/products
    async index(req, res) {
        let category = await Category.find();
        category = mutipleMongooseToObject(category);
        res.render('admin/categories/list', { layout: 'admin-main', category });
    }

    // [GET] admin/products/create
    async create(req, res) {
        res.render('admin/categories/create', { layout: 'admin-main'})
    }

    // [POST] admin/products/store
    async store(req, res) {
        let category = new Category({
            name: req.body.name,
        })
        category = await category.save()
        if(!category){
            return res.status(500).send('The product cannot be created !!');
        }

        res.redirect('/admin/categories');
    }

    // [GET] admin/categories/:id/update
    async update(req, res) {
        const id = req.params.id

        let category = await Category.findById(id);
        category = mongooseToObject(category);
        res.render('admin/categories/update', { layout: 'admin-main', category })
    }

    // [PUT] admin/products/:id
    async edit(req, res) {
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).send("Invalid Category Id");
        }
    
        const category = await Category.updateOne(
            {_id: req.params.id},
            {
                name: req.body.name,
            }
        )
    
        if(!category)
        return res.status(500).send('The category cannot be updated !!')
    
        res.redirect('/admin/categories');
    }

    // [DELETE] admin/categories/:id
    destroy(req,res) {
        Category.findByIdAndRemove(req.params.id).then(category =>{
            if(category){
                return res.redirect('back')
            }else{
                return res.status(404).json({success:false, message:"Category not found"})
            }
        }).catch(err=>{
            return res.status(400).json({success: false, error: err})
        })
    }

}



module.exports = new AdminCategoryController()
