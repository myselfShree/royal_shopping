import express from 'express';

const router = express.Router();

router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'Royal Shopping API is running' });
});

router.get('/ready', async (_req, res) => {
  // lightweight readiness probe; ensures Node process is up
  res.status(200).json({ status: 'ready' })
})

export default router;
