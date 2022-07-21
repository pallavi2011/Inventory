const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');



// Get all users
router.get('/', async (req, res) => {
    let users = await User.find({});
    res.send(users);
});

// Register User
router.post('/register',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter valid email id').isEmail(),
    check('password', 'Password should be of 8 characters').isLength({min: 8})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password, company, designation, qualification, bio} = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg: 'User already exists'})
        }
        user = new User({name, email, password, company, designation, qualification, bio});
        await user.save();
        let token = user._id;
        res.status(200).json({token, user});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
    
});


//Get User profile
router.get('/:id', async(req, res) => {
    try {
        const profile = await User.findById({_id: req.params.id});
        if(!profile){
            return res.status(400).json({msg: 'No profile created for this user'})
        }
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
} );

//Update User profile
router.put('/:id',[
    check('company', 'Company is required').not().isEmpty(),
    check('designation', 'Please enter your designation').not().isEmpty(),
    check('qualification', 'Please enter your qualification').not().isEmpty(), 
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {company, designation, qualification, bio} = req.body;
    try { 
        let profile = await User.findOne({_id: req.params.id});
        if(!profile){
            return res.status(400).json({msg: 'No profile created for this user'})
        }
        const profilefields = {};
        profilefields.user = req.params.id;
        if(company) profilefields.company = company;
        if(designation) profilefields.designation = designation;
        if(qualification) profilefields.qualification = qualification;
        if(bio) profilefields.bio = bio;
        
        profile = await User.findOneAndUpdate({ user: req.params.id}, {$set: profilefields}, {new: true});

        return res.json(profile);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
} )


//Login User
router.post('/login',[
    check('email', 'Please enter valid email id').isEmail(),
    check('password', 'Password should be of 8 characters').isLength({min: 8})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: 'User not registered'})
        }
        let token = user._id;
        res.status(200).json({token, user});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
    
});


//Change Password

router.put('/changepassword/:id', [
    check('password', 'Please enter new password').not().isEmpty(),
    check('confirmpassword', 'Please enter confirm password').not().isEmpty()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {password, confirmpassword} = req.body;
    if(password !== confirmpassword){
        return res.status(400).json({msg: 'Confirm password should be same as password'})
    }
    let user = await User.findById({_id: req.params.id});

    if(!user){
        return res.status(400).json({msg: 'User does not exist'})
    }
    if(user.password == password){
        return res.status(400).json({msg: 'Please enter new password'})
    }
    
    user = await User.findOneAndUpdate({ user: req.params.id}, {$set: {password: password}}, {new: true});

        return res.json(user);
})
module.exports = router;