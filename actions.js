const express = require('express')
const HttpError = require('./models/http-error')
const router = express.Router();
const Product = require('./models/Products')

const postproducts = async (req, res, next) => {
let result
const { name, tags } = req.body;
const newProduct = new Product({

    name,
    tags

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
    const query = {}
    query.tags = req.query.tags
    try {

        products = await Product.find(query)

    } catch (error) {
        
        return next(new HttpError('couldnt get products', 400))

    }

    res.json({products})

}

router.post('/products', postproducts)
router.get('/products', getproducts)
module.exports = router;
