import express from 'express';
import UserContoller from '../controllers/userController.js';
import BaseController from '../controllers/baseController.js';

const userRouter = express.Router();

const controller = new UserContoller();
const baseController = new BaseController();

//List all users
userRouter.get('/', async (req, res) => {
  const userAuthentication = await baseController.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.getList();
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});

//Get user by Id
userRouter.get('/:ID', async (req, res) => {
  const userAuthentication = await baseController.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.getByID(req.params.ID);
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});

//Create new user
userRouter.post('/', async (req, res) => {
  const userAuthentication = await baseController.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.createUser(req.body);
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});

//Update user by ID
userRouter.patch('/:ID', async (req, res) => {
  const userAuthentication = await baseController.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.updateUser(req.body, req.params.ID);
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});

//Delete user by ID
userRouter.delete('/:ID', async (req, res) => {
  const userAuthentication = await baseController.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.deleteUser(req.params.ID);
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});


export default userRouter;