import express from 'express';
import UserContoller from '../controllers/userController.js';

const userRouter = express.Router();

const controller = new UserContoller();

//List all users
userRouter.get('/', async (req, res) => {
  const response = await controller.getList();
  console.log(response);
  res.status(response.status).send(response.message);
});

//Get user by Id
userRouter.get('/:ID', async (req, res) => {
  const response = await controller.getByID(req.params.ID);

  res.status(response.status).send(response.message);
});

//Create new user
userRouter.post('/', async (req, res) => {
  const response = await controller.createUser(req.body);

  res.status(response.status).send(response.message);
});

//Update user by ID
userRouter.patch('/:ID', async (req, res) => {
  const response = await controller.updateUser(req.body, req.params.ID);

  res.status(response.status).send(response.message);
});

//Delete user by ID
userRouter.delete('/:ID', async (req, res) => {
  const response = await controller.deleteUser(req.params.ID);

  res.status(response.status).send(response.message);
});


export default userRouter;