import express from 'express';
import BaseController from '../controllers/baseController.js';

const baseRouter = express.Router();
const baseController = new BaseController();


baseRouter.post('/authenticate', async (req, res) => {
  const response = await baseController.authenticate(req.body);
  
  res.status(response.status).json(response.message);
})

export default baseRouter;