import express, { Request, Response } from 'express';
const router = express.Router();

import { addDonarMiddleware, donarDetailsMiddleware } from '../middleware/donarMiddleware';
import { saveDonarHandler, showAllDonarHandler, showDonarDetailsHandler } from '../handler/donarHandler';

router.get('/', showAllDonarHandler);

router.get('/:donar', donarDetailsMiddleware, showDonarDetailsHandler);

router.post('/add', addDonarMiddleware, saveDonarHandler);

export default router;