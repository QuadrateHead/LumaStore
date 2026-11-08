import { Router } from 'express';

const couponsRouter = Router();

couponsRouter.post('/validate', (req, res) => res.send({title: 'POST coupon'}));

export default couponsRouter;