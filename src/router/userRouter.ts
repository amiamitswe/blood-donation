import express from 'express';
import checkLogin from '../handler/checkLogin';
import { signupHandler, loginHandler, logoutHandler } from '../handler/userHandler';
import { signupMiddleware, loginMiddleware } from '../middleware/userMiddleware';

const router = express.Router();

// create user
router.post('/signup', signupMiddleware, signupHandler);

// login user
router.post('/login', loginMiddleware, loginHandler);

// log out user
router.post('/logout', checkLogin, logoutHandler);

export default router;
