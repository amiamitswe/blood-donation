import express, { Request, Response } from 'express';
const router = express.Router();

import { addDonarMiddleware, donarDetailsMiddleware, updateDonarImageMiddleware, updateDonarStatusMiddleware } from '../middleware/donarMiddleware';
import { changeImageHandler, changeStatusHandler, saveDonarHandler, showAllDonarHandler, showDonarDetailsHandler } from '../handler/donarHandler';


router.get('/', showAllDonarHandler);

router.get('/about/:donar', donarDetailsMiddleware, showDonarDetailsHandler);

router.post('/add', addDonarMiddleware, saveDonarHandler);

router.put('/change-status', updateDonarStatusMiddleware, changeStatusHandler);

router.put('/change-image', updateDonarImageMiddleware, changeImageHandler);

export default router;