
import express from 'express';
import productsModel from './productsModel.js';


const router = express.Router(); 
router.get('/', async (req, res) => {
    const products = await productsModel.find()
    res.send(products)
});

router.post("/", async (req, res) => {
	const products = new productsModel({
		product_id: req.body.product_id,
		site_id: req.body.site_id,
        description: req.body.description,
        category_id: req.body.category_id,
        sub_category_id: req.body.category_id,
        price : req.body.price,
        images : req.body.images,
        options : req.body.options
    })
	await products.save()
	res.send(products)
})


export default router;