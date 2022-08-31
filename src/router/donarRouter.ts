import express, { Request, Response } from 'express';
const router = express.Router();

import { addDonarMiddleware } from '../middleware/donarMiddleware';
import { saveDonarHandler } from '../handler/donarHandler';

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ success: 'success !!!!!!' });
});

router.post('/add', addDonarMiddleware, saveDonarHandler);

export default router;