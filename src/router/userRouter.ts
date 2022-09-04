import express from 'express';
import { signupHandler } from '../handler/userHandler';
import { signupMiddleware } from '../middleware/userMiddleware';

const router = express.Router();

// create user
router.post('/', signupMiddleware, signupHandler);

export default router;
