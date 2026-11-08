import { Router } from 'express';

const adminRouter = Router();

adminRouter.get('/dashboard', (req, res) => res.send({title: "GET smth"}))
adminRouter.post('/products', (req, res) => res.send({title: "GET smth"})) 
adminRouter.patch('/products/:id', (req, res) => res.send({title: "GET smth"}))
adminRouter.delete('/products/:id', (req, res) => res.send({title: "GET smth"}))
adminRouter.patch('/orders/:id/status', (req, res) => res.send({title: "GET smth"}))
adminRouter.get('/customers', (req, res) => res.send({title: "GET smth"}))
adminRouter.patch('/reviews/:id/moderation', (req, res) => res.send({title: "GET smth"})) 


export default adminRouter;