import express from 'express';
import UserContoller from '../controllers/userController.js';

const userRouter = express.Router();

const controller = new UserContoller();

//List all users
userRouter.get('/', async (req, res) => {
  const userAuthentication = await controller.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.getList();
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});

//Get user by Id
userRouter.get('/:ID', async (req, res) => {
  const userAuthentication = await controller.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.getByID(req.params.ID);
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});

//Create new user
userRouter.post('/', async (req, res) => {
  const userAuthentication = await controller.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.create(req.body);
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});

//Update user by ID
userRouter.patch('/:ID', async (req, res) => {
  const userAuthentication = await controller.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.update(req.body, req.params.ID);
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});

//Delete user by ID
userRouter.delete('/:ID', async (req, res) => {
  const userAuthentication = await controller.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.delete(req.params.ID);
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});


export default userRouter;