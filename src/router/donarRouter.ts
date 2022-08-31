import express from 'express';
const router = express.Router();

router.get('/add', (req, res) => {
  res.status(200).json({ success: 'success' });
});

export default router;