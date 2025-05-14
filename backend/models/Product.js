export default class Product {
  ID = null;
  Name = null;
  Price = null;
  StockQuantity = null;

  setNew(productData) {
    if(productData.ID && productData.ID !== this.getID()) {
      this.setID(productData.ID);
      this.setName(productData.Name);
      this.setPrice(productData.Price);
      this.setStockQuantity(productData.StockQuantity);
    }
    return this;
  }

  getID() {
    return this.ID;
  }

  setID(newID) {
    this.ID = newID;
  }

  getName() {
    return this.Name;
  }

  setName(newName) {
    this.Name = newName;
  }

  getPrice() {
    return this.Price;
  }

  setPrice(newPrice) {
    this.Price = newPrice;
  }

  getStockQuantity() {
    return this.StockQuantity;
  }

  setStockQuantity(newStockQuantity) {
    this.StockQuantity = newStockQuantity;
  }
}