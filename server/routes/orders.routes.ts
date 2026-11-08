import { Router } from 'express';

const ordersRouter = Router();

ordersRouter.post('/', (req, res) => res.send({title: 'POST order'}));
ordersRouter.get('/:id', (req, res) => res.send({title: 'GET order item'}));


export default ordersRouter;