import express from 'express';
import UserContoller from '../controllers/userController.js';

const userRouter = express.Router();

const controller = new UserContoller();

//List all users
userRouter.get('/', async (req, res) => {
  const response = await controller.getList();
  console.log(response);
  res.json(response);
});

//Get user by Id
userRouter.get('/:ID', async (req, res) => {
  const response = await controller.getByID(req.params.ID);

  res.json(response);
});

//Create new user
userRouter.post('/', async (req, res) => {
  const response = await controller.createUser(req.body);

  res.json(response);
});

//Update user by ID
userRouter.patch('/:ID', async (req, res) => {
  const response = await controller.updateUser(req.body, req.params.ID);

  res.json(response);
});

//Delete user by ID
userRouter.delete('/:ID', async (req, res) => {
  const response = await controller.deleteUser(req.params.ID);

  res.json(response);
});


export default userRouter;