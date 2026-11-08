import express, { urlencoded } from 'express';
import { PORT } from './config/env.ts';

import authRouter from './routes/auth.routes.ts';
import productsRouter from './routes/products.routes.ts';
import cartRouter from './routes/cart.routes.ts';
import ordersRouter from './routes/orders.routes.ts';
import couponsRouter from './routes/coupons.routes.ts';
import adminRouter from './routes/admin.routes.ts';


const app = express();

app.get('/', (req, res) => {
   res.send('Welcome to the Luma Backend');
});

app.use(express.json());
app.use(urlencoded({extended: true}));

app.use('/api/auth/', authRouter);
app.use('/api/products/', productsRouter);
app.use('/api/cart/', cartRouter);
app.use('/api/orders/', ordersRouter);
app.use('/api/coupons/', couponsRouter);
app.use('/api/admin/', adminRouter);

app.listen(PORT, () => {
   console.log(`LumaStore backend is running on http://localhost:${PORT}`);
});

export default app;
