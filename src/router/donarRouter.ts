import express, { Request, Response } from 'express';
const router = express.Router();
import cors from 'cors';

import {
  addDonarMiddleware,
  donarDetailsMiddleware,
  updateDonarImageMiddleware,
  updateDonarStatusMiddleware,
} from '../middleware/donarMiddleware';
import {
  changeImageHandler,
  changeStatusHandler,
  saveDonarHandler,
  showAllDonarHandler,
  showDonarDetailsHandler,
} from '../handler/donarHandler';
import checkLogin from '../middleware/checkLogin';

router.get('/', cors(), showAllDonarHandler);

router.get('/about/:donar', cors(), donarDetailsMiddleware, showDonarDetailsHandler);

router.post('/add', cors(), checkLogin, addDonarMiddleware, saveDonarHandler);

router.put('/change-status', cors(), updateDonarStatusMiddleware, changeStatusHandler);

router.put('/change-image', cors(), updateDonarImageMiddleware, changeImageHandler);

export default router;
