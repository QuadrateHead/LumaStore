import { Router } from 'express';
import {getAllProducts, getProduct} from '../controllers/product.contrloller.ts'
const productsRouter = Router();

productsRouter.get('/', getAllProducts);
productsRouter.get('/:slug', getProduct);


export default productsRouter;