import express from 'express';
import ProductController from '../controllers/productController.js';

const productRouter = express.Router();

const controller = new ProductController();

//List all products
productRouter.get('/', async (req, res) => {
  const userAuthentication = await controller.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.getList();
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});

//Get product by Id
productRouter.get('/:ID', async (req, res) => {
  const userAuthentication = await controller.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.getByID(req.params.ID);
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});

//Get products by TransactionId
productRouter.get('/transactions/:transactionID', async (req, res) => {
  const userAuthentication = await controller.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.getListByTransactionID(req.params.transactionID);
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});

//Create new product
productRouter.post('/', async (req, res) => {
  const userAuthentication = await controller.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.create(req.body);
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});

//Update product by ID
productRouter.patch('/:ID', async (req, res) => {
  const userAuthentication = await controller.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.update(req.body, req.params.ID);
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});

//Delete product by ID
productRouter.delete('/:ID', async (req, res) => {
  const userAuthentication = await controller.checkAuthentication(req.headers.authorization);
  if(userAuthentication) {
    const response = await controller.delete(req.params.ID);
    res.status(response.status).send(response.message);
  } else {
    res.status(userAuthentication.status).send(userAuthentication.message);
  }
});


export default productRouter;