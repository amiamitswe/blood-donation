import express from 'express';
import checkLogin from '../handler/checkLogin';
import {
  signupHandler,
  loginHandler,
  logoutHandler,
  changePasswordHandler,
  favoriteDonarHandler,
  forgotPasswordHandler,
} from '../handler/userHandler';
import {
  signupMiddleware,
  loginMiddleware,
  changePasswordMiddleware,
  favoriteDonarMiddleware,
  forgotPasswordMiddleware,
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

// forgot password request
router.post('/forgot-password', forgotPasswordMiddleware, forgotPasswordHandler);

// password reset
router.post('/password-reset/:userId/:token', (req, res) => {
  console.log(req.params);

  res.end();
});

export default router;
