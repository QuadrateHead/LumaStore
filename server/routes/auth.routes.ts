import { Router } from 'express';

const authRouter = Router();

authRouter.post('/register', (req, res) => res.send({title: 'Sign up'}));
authRouter.post('/login', (req, res) => res.send({title: 'Sign In'}));
authRouter.post('/refresh', (req, res) => res.send({title: 'Sign Out'}));
authRouter.post('/logout', (req,res) => res.send({title: 'Sign Out'}));

authRouter.get('/me', (req, res) => res.send({title: 'Me'}));

authRouter.post('/forgot-password', (req, res) => res.send({title: 'Forgot Password'}));
authRouter.post('/reset-password', (req,res) => res.send({title: 'Reser Password'}));

export default authRouter;