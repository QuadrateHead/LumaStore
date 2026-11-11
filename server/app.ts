import express, { urlencoded } from 'express';
import cors from 'cors';
import { CLIENT_ORIGIN, NODE_ENV, PORT } from './config/env.ts';
import { connectDB } from './lib/db.ts'

import authRouter from './routes/auth.routes.ts';
import productsRouter from './routes/products.routes.ts';
import cartRouter from './routes/cart.routes.ts';
import ordersRouter from './routes/orders.routes.ts';
import couponsRouter from './routes/coupons.routes.ts';
import adminRouter from './routes/admin.routes.ts';


const app = express();

app.use(cors({
   origin: CLIENT_ORIGIN ?? (NODE_ENV === 'production' ? false : 'http://localhost:3000'),
}));

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

async function startServer(): Promise<void> {
   try {
      await connectDB();
      app.listen(PORT, () => {
         console.log(`LumaStore backend is running on http://localhost:${PORT}`);
      });
   } catch (error) {
      console.error('Failed to connect to the database:', error);
      process.exit(1);
   }
}

void startServer();

export default app;
