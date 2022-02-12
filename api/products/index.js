
import express from 'express';
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

export default router;