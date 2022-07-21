const express = require('express');
const router = express.Router();
const Category = require('../../models/Category');
const {check, validationResult} = require('express-validator');

//Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
});

//Create category
router.post('/', [
    check('categoryname', 'Please enter category name').not().isEmpty(),
    check('categoryId', 'Please enter category Id').not().isEmpty()
    ], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {categoryId, categoryname, description} = req.body;
    try {
        let category = await Category.findOne({categoryname});
        if(category){
            return res.status(400).json({msg:'Category already exists'})
        }
        category = new Category({
            categoryId, categoryname, description
        });
    
        await category.save();
    
        res.status(200).json({msg: 'Category created successfully'})
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')  
    }
});


//Update category
router.put('/:categoryId', [
    check('categoryname', 'Please enter category name').not().isEmpty(),
],async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {categoryname, description} = req.body;
    try {
        let category = await Category.findOne({_id: req.params.categoryId});
        if(!category){
            return res.status(400).json({msg: 'Category not found'})
        }
        category = await Category.findOneAndUpdate({_id:req.params.categoryId}, {$set: {categoryname: categoryname, description: description}});
        res.status(200).json({msg: 'Category updated successfully'})
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error') 
    }
});


//Delete category
router.delete('/:categoryId', async(req, res) => {
    try {
        let category = await Category.findOne({_id:req.params.categoryId});
        if(!category){
            return res.status(400).json({msg: 'Category not found'})
        }
        category = await Category.findOneAndDelete({_id:req.params.categoryId});
        res.status(200).json({msg: 'Category deleted successfully'})
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error') 
    }
});



module.exports = router;