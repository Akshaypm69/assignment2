const express = require('express')
const HttpError = require('./models/http-error')
const router = express.Router();
const Product = require('./models/Products')
const Contact = require('./models/contact')
const Subscription = require('./models/subscriberlist')
const About = require('./models/about')
const Contactinfo = require('./models/contactifo')
const Ingredient = require('./models/ingredients')
const fileupload = require('./middleware/fileupload')

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


const getabout = async(req, res, next) => {

let result

try {
    result = await About.find({});
} catch (error) {
    return next(new HttpError('not able to get about',400))
}
res.json(result)

}
const createabout = async (req, res, next) => {
let result
const about = new About({
    image:'http://localhost:3000/' + req.file.path,
    description:req.body.description

})
console.log(req.file.path)
try {
    result = await about.save()
} catch (error) {
    return next(new HttpError('not able to get about',400))
}
res.json(result)

}


const getingredinets = async(req, res, next) => {


    let result

    try {
        result = await Ingredient.find({});
    } catch (error) {
        return next(new HttpError('not able to get ingredients',400))
    }
    res.json(result)


}

const postingredinets = async (req, res, next) => {
    let result
    const {title, description, image} = req.body
    const newingred = new Ingredient({
    
        title,
        description,
        image
    
    })
    try {
        result = await newingred.save()
    } catch (error) {
        return next(new HttpError('not able to post ingred',400))
    }
    res.json(result)
    
    }
    
const getinfo = async(req, res, next) => {

    let result

    try {
        result = await Contactinfo.find({});
    } catch (error) {
        return next(new HttpError('not able to get contactinfo',400))
    }
    res.json(result)

}

const putinfo = async(req, res, next) => {

    let result
    const {address1, address2, contact} = req.body
    const Contact = new Contactinfo({
    
        address1,
        address2,
        contact

    })
    try {
        result = await Contact.save()
    } catch (error) {
        return next(new HttpError('not able to put contactinfo',400))
    }
    res.json(result)
    

}

router.post('/products', postproducts)
router.get('/products', getproducts)
router.post('/contactus',postcontactus)
router.post('/subscribe',addsubscription)
router.post('/about',fileupload.single('image'),createabout)
router.get('/aboutus',getabout)
router.get('/ingredients',getingredinets)
router.post('/ingredients',postingredinets)
router.get('/contactus',getinfo)
router.post('/contactinfo',putinfo)

module.exports = router;
