import express, { RequestHandler } from 'express';
import { signupMiddleware } from '../middleware/userMiddleware';

const router = express.Router();

// create user
router.post('/', signupMiddleware, (req, res) => {
  res.send('ok');
});

export default router;
