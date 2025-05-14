import ProductController from "../controllers/productController.js";

export default class TransactionProduct {
  ID = null;
  TransactionID = null;
  ProductID = null;
  ProductQuantity = null;
  Product = [];
  Value = 0;

  async setNew(transactionProductData) {
    if(transactionProductData.ID && transactionProductData.ID !== this.getID()) {
      this.setID(transactionProductData.ID);
      this.setTransactionID(transactionProductData.TransactionID);
      this.setProductID(transactionProductData.ProductID);
      this.setProductQuantity(transactionProductData.ProductQuantity);
      await this.setProduct();
      this.setValue();
    }
    return this;
  }

  getID() {
    return this.ID;
  }

  setID(newID) {
    this.ID = newID;
  }

  getTransactionID() {
    return this.TransactionID;
  }

  setTransactionID(newTransactionID) {
    this.TransactionID = newTransactionID;
  }

  getProductID() {
    return this.ProductID;
  }

  setProductID(newProductID) {
    this.ProductID = newProductID;
  }

  getProductQuantity() {
    return this.ProductQuantity;
  }

  setProductQuantity(newProductQuantity) {
    this.ProductQuantity = newProductQuantity;
  }
  
  getProduct() {
    return this.Product;
  }

  async setProduct() {
    this.Product = (await new ProductController().getByID(this.ProductID)).message;
  }

  getValue() {
    return this.Value;
  }

  setValue() {
    this.Value = this.Product.Price * this.ProductQuantity;
  }
}