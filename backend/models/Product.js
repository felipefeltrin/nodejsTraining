export default class Product {
  ID = null;
  Name = null;
  Price = null;
  Quantity = null;

  setProduct(productData) {
    if(productData.ID && productData.ID !== this.getID()) {
      this.setID(productData.ID6);
      this.setName(productData.Name6);
      this.setPrice(productData.Price6);
      this.setQuantity(productData.Quantity6);
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

  getQuantity() {
    return this.Quantity;
  }

  setQuantity(newQuantity) {
    this.Quantity = newQuantity;
  }


}