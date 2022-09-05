import express from 'express';
import { signupHandler, loginHandler, logoutHandler } from '../handler/userHandler';
import checkLogin from '../middleware/checkLogin';
import { signupMiddleware, loginMiddleware, logOutMiddleware } from '../middleware/userMiddleware';

const router = express.Router();

// create user
router.post('/signup', signupMiddleware, signupHandler);

// login user
router.post('/login', loginMiddleware, loginHandler);

// log out user
router.post('/logout', checkLogin, logOutMiddleware, logoutHandler);

export default router;
