import express from 'express';
import checkLogin from '../handler/checkLogin';
import {
  signupHandler,
  loginHandler,
  logoutHandler,
  changePasswordHandler,
} from '../handler/userHandler';
import {
  signupMiddleware,
  loginMiddleware,
  changePasswordMiddleware,
} from '../middleware/userMiddleware';

const router = express.Router();

// create user
router.post('/signup', signupMiddleware, signupHandler);

// login user
router.post('/login', loginMiddleware, loginHandler);

// log out user
router.post('/logout', checkLogin, logoutHandler);

// change user password
router.put('/change-password', changePasswordMiddleware, changePasswordHandler);

export default router;
