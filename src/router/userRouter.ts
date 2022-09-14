import express from 'express';
import checkLogin from '../handler/checkLogin';
import {
  signupHandler,
  loginHandler,
  logoutHandler,
  changePasswordHandler,
  favoriteDonarHandler,
} from '../handler/userHandler';
import {
  signupMiddleware,
  loginMiddleware,
  changePasswordMiddleware,
  favoriteDonarMiddleware,
} from '../middleware/userMiddleware';

const router = express.Router();

// create user
router.post('/signup', signupMiddleware, signupHandler);

// login user
router.post('/login', loginMiddleware, loginHandler);

// log out user
router.post('/logout', checkLogin, logoutHandler);

// change user password
router.put('/change-password', checkLogin, changePasswordMiddleware, changePasswordHandler);

// add favorite donar
router.put('/favorite-donar', checkLogin, favoriteDonarMiddleware, favoriteDonarHandler);

export default router;
