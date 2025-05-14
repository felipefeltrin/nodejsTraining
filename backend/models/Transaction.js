import TransactionProductController from "../controllers/transactionProductController.js";

export default class Transaction {
  ID = null;
  TransactionDate = null;
  DeliveryDate = null;
  UserID = null;
  Products = [];
  TotalValue = 0;


  async setNew(transactionData) {
    if(transactionData.ID && transactionData.ID !== this.getID()) {
      this.setID(transactionData.ID);
      this.setTransactionDate(transactionData.TransactionDate);
      this.setDeliveryDate(transactionData.DeliveryDate);
      this.setUserID(transactionData.UserID);
      await this.setProducts();
      await this.setTotalValue();
    }
    return this;
  }

  getID() {
    return this.ID;
  }

  setID(newID) {
    this.ID = newID;
  }

  getTransactionDate() {
    return this.TransactionDate;
  }

  setTransactionDate(newTransactionDate) {
    this.TransactionDate = newTransactionDate;
  }

  getDeliveryDate() {
    return this.DeliveryDate;
  }

  setDeliveryDate(newDeliveryDate) {
    this.DeliveryDate = newDeliveryDate;
  }

  getUserID() {
    return this.UserID;
  }

  setUserID(newUserID) {
    this.UserID = newUserID;
  }

  getProducts() {
    return this.Products;
  }

  async setProducts() {
    this.Products = (await new TransactionProductController().getListByTransactionID(this.ID)).message;
  }

  getTotalValue() {
    return this.TotalValue;
  }

  setTotalValue() {
    for(let i = 0; i < this.Products.length; i++) {
      this.TotalValue += this.Products[i].Value;
    }
  }
}