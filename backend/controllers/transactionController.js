import Transaction from "../models/Transaction.js";
import BaseController from "./baseController.js";
import ProductController from "./productController.js";

export default class TransactionController extends BaseController {
  tableName = "Transactions";
  object = new Transaction();
  blockedUpdateFields = ["ID", "TransactionDate", "UserID"];
  noDatabaseFields = ["Products", "TotalValue"];

  async create(transactionData) {
    try {
      Object.keys(transactionData).forEach(field => {
        if(field === "ID") {
          throw "ID is auto-generated and cannot be mannually inserted."
        }
        if(!this.object.hasOwnProperty(field) && field !== "Products") {
          throw `Invalid field ${field} detected on body`;
        }
      });
      let paramsString = "";
      let insertFieldString = "";
      Object.keys(this.object).forEach(insertField => {
        if(insertField !== "ID" && !this.noDatabaseFields.includes(insertField)){
          insertFieldString += insertField + ", ";
          paramsString += "?, "
        }
      });
      paramsString = paramsString.replace(/(, $)/g, "");
      insertFieldString = insertFieldString.replace(/(, $)/g, "");

      const sql = `INSERT INTO ${this.tableName} (${insertFieldString}) VALUES (${paramsString})`;
      await this.connectToDatabase();
      const result = await this.conn.promise().query(sql, Object.values(transactionData));
      await this.disconnectFromDatabase();

      transactionData.Products.forEach(product => {
        this.addProduct(result[0].insertId, product.ID, product.Quantity);
      });

      return {
        status: 200,
        message: result[0].insertId
      };
    } catch (error) {
      throw error;
    }
  }

  async getListByUserId(userID) {
    try {
      const sql = `SELECT * FROM ${this.tableName} WHERE UserId = ?`;

      console.log(userID);
      await this.connectToDatabase();
      const results = await this.conn.promise().query(sql, userID);
      await this.disconnectFromDatabase();
      const items = results[0];

      if (items.length === 0) {
        return {
          status: 404,
          message: "No transactions found for user" + userID
        };
      }

      const responseList = [];
      for(let i = 0; i < items.length; i++) {
        const newObject = await this.object.setNew(items[i]);
        responseList.push(newObject);
      }

      return {
        status: 200,
        message: responseList
      };
    } catch (error) {
        throw error;
    }
  }

  async addProduct(ID, productID, productQuantity) {
    try {
      const sql = `INSERT INTO TransactionProducts (TransactionID, ProductID, ProductQuantity) VALUES (?, ?, ?)`;
      
      await this.connectToDatabase();
      const results = await this.conn.promise().query(sql, [ID, productID, productQuantity]);
      await this.disconnectFromDatabase();
      
      if (results[0].affectedRows === 0) {
        return {
          status: 404,
          message: "Not found Transaction with ID" + ID
        };
      }

      await new ProductController().subtractProductQuantity(productID, productQuantity);
      return {
        status: 200,
        message: "Affected transactions: " + results[0].affectedRows
      };
    } catch (error) {
        throw error;
    }
  }

  async replaceProduct(ID, oldProductID, oldProductQuantity, newProductID, newProductQuantity) {
    try {
      const sql = `UPDATE TransactionProducts SET ProductID = ?, ProductQuantity = ? WHERE TransactionID = ? AND ProductID = ?`;
      
      await this.connectToDatabase();
      const results = await this.conn.promise().query(sql, [newProductID, newProductQuantity, ID, oldProductID]);
      await this.disconnectFromDatabase();
      
      if (results[0].affectedRows === 0) {
        return {
          status: 404,
          message: "Not found Transaction with ID" + ID
        };
      }

      await new ProductController().subtractProductQuantity(newProductID, newProductQuantity);
      await new ProductController().increaseProductQuantity(oldProductID, oldProductQuantity);

      return {
        status: 200,
        message: "Affected transactions: " + results[0].affectedRows
      };
    } catch (error) {
        throw error;
    }
  }
}