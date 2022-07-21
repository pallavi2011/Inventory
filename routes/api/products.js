const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Product = require('../../models/Products');

//Get all products
router.get('/', async(req, res) => {
    try {
        const products = await Product.find({});
        if(!products){
            return res.status(404).json({msg: 'No products found'})
        }
        res.status(200).json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

//Get product by category
router.get('/:category', async(req, res) => {
    try {
        const product = await Product.find({category: req.params.category});
        if(!product){
            return res.status(404).json({msg: 'No products found for selected category'})
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})


//Create product
router.post('/',[
    check('productname', 'Product name is required').not().isEmpty(),
    check('category', 'Please select one category').not().isEmpty(),
    check('price', 'Please enter product price').not().isEmpty()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const {productname, category, description, price} = req.body;
        let product = new Product({
            productname, category, description, price
        });
    
        await product.save();
    
        res.status(200).json({msg: 'Product created successfully'})
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }

});

//Delete a product
router.delete('/:id', async(req, res) => {
    let product = await Product.findById(req.params.id);
    if(!product){
        res.status(404).json({msg: 'Product not found'})
    }
    product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({msg: 'Product deleted successfully'})
});



module.exports = router;