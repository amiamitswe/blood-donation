import express, { Request, Response } from 'express';
const router = express.Router();
import cors from 'cors';

import {
  addDonarMiddleware,
  donarDetailsMiddleware,
  updateDonarImageMiddleware,
  updateDonarMiddleware,
  updateDonarStatusMiddleware,
} from '../middleware/donarMiddleware';
import {
  changeImageHandler,
  changeStatusHandler,
  saveDonarHandler,
  showAllDonarHandler,
  showDonarDetailsHandler,
  updateProfileHandler,
} from '../handler/donarHandler';
import checkLogin from '../handler/checkLogin';

router.get('/', showAllDonarHandler);

router.get('/about/:donar', checkLogin, donarDetailsMiddleware, showDonarDetailsHandler);

router.post('/add', checkLogin, addDonarMiddleware, saveDonarHandler);

router.put('/change-status', checkLogin, updateDonarStatusMiddleware, changeStatusHandler);

router.put('/change-image', checkLogin, updateDonarImageMiddleware, changeImageHandler);

router.patch(
  '/update-profile/:donar',

  checkLogin,
  updateDonarMiddleware,
  updateProfileHandler
);

export default router;
