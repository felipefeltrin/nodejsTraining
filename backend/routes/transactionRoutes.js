import express from 'express';
import TransactionController from '../controllers/transactionController.js';

const transactionRouter = express.Router();

const controller = new TransactionController();

//List all transactions
transactionRouter.get('/', async (req, res) => {
  const userAuthentication = await controller.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.getList();
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});

//Get transaction by Id
transactionRouter.get('/:ID', async (req, res) => {
  const userAuthentication = await controller.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.getByID(req.params.ID);
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});

//Get transaction by UserId
transactionRouter.get('/user/:UserID', async (req, res) => {
  const userAuthentication = await controller.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.getListByUserId(req.params.UserID);
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});

//Create new transaction
transactionRouter.post('/', async (req, res) => {
  const userAuthentication = await controller.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.create(req.body);
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});

//Add product to transaction
transactionRouter.put('/addproduct/:ID/:productID/:productQuantity', async (req, res) => {
  const userAuthentication = await controller.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.addProduct(req.params.ID, req.params.productID, req.params.productQuantity);
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});

//Replace transaction product
transactionRouter.put('/replaceproduct/:ID/:oldProductID/:oldProductQuantity/:newProductID/:newProductQuantity', async (req, res) => {
  const userAuthentication = await controller.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.replaceProduct(req.params.ID, req.params.oldProductID, req.params.oldProductQuantity, req.params.newProductID, req.params.newProductQuantity);
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});


export default transactionRouter;