
import express from 'express';
import uniqid from 'uniqid'
import { products , productDetails } from './productsData';

const router = express.Router(); 
router.get('/', (req, res) => {
    res.json(products);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (productDetails.id == id) {
        res.status(200).json(productDetails);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
})

//Post a movie review
router.post('/addNew', (req, res) => {
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        req.body.id = uniqid();
        products.push(req.body); //push the new review onto the list
        res.status(201).json(req.body);
        });



export default router;