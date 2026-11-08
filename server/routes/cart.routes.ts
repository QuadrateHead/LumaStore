import { Router } from 'express';

const cartRouter = Router();

cartRouter.get('/', (req, res) => res.send({title: 'GET cart'}));
cartRouter.post('/items', (req, res) => res.send({title: 'POST cart items'}));
cartRouter.patch('/items/:variantId', (req, res) => res.send({title: 'CHANGE cart item'}));
cartRouter.delete('/items/:variantId', (req, res) => res.send({title: 'DELETE cart item'}));

export default cartRouter;