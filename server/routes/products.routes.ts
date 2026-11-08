import { Router } from 'express';

const productsRouter = Router();

productsRouter.get('/', (req,res) => {
    res.send({title: 'GET all products'});
});
productsRouter.get('/:slug', (req,res) => {
    res.send({title: 'GET product details'});
});


export default productsRouter;