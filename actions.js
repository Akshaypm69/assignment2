const express = require('express')
const HttpError = require('./models/http-error')
const router = express.Router();
const Product = require('./models/Products')
const Contact = require('./models/contact')
const Subscription = require('./models/subscriberlist')
const postproducts = async (req, res, next) => {
let result
const { Name, Price, Path } = req.body;
const newProduct = new Product({

    Name,
    Price,
    Path

})
try {
    result = await newProduct.save();
} catch (error) {
    return next(new HttpError('couldnt add prosuct', 400))
}

res.json({result})

}

const getproducts = async (req, res, next) => {

    let products
    
    const sort = req.query.sort || 1
    try {

        products = await Product.find({}).sort({Price:sort})

    } catch (error) {
        
        return next(new HttpError('couldnt get products', 400))

    }
   
    res.json({products:products.map(product => product.toObject({ getters:true }))})

}
const postcontactus = async (req, res, next) => {

    let result
    const { name, email, message } = req.body;
    let contact = new Contact({
        name,
        email,
        message
    });

    try {
        result = await contact.save()
    } catch (error) {
        return next(new HttpError('couldnt add contact us', 400))
    }

res.json({result})

}

const addsubscription = async (req, res, next) => {
    const subs = new Subscription({

        email:req.body.email

    })
    let result;

    try {
        result = await subs.save()
    } catch (error) {
        return next(new HttpError('couldnt add subscription', 400))
    }

    res.json({result})
}
router.post('/products', postproducts)
router.get('/products', getproducts)
router.post('/contactus',postcontactus)
router.post('/subscribe',addsubscription)
module.exports = router;
