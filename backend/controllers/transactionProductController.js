import TransactionProduct from "../models/TransactionProduct.js";
import BaseController from "./baseController.js";

export default class TransactionProductController extends BaseController {
  tableName = "TransactionProducts";
  object = new TransactionProduct();
  blockedUpdateFields = ["ID", "TransactionDate", "UserID"];
  noDatabaseFields = ["Value"];

  async getListByTransactionID(transactionID) {
    try {
      const sql = `SELECT * FROM ${this.tableName} WHERE TransactionID = ?`;
      
      await this.connectToDatabase();
      const results = await this.conn.promise().query(sql, transactionID);
      await this.disconnectFromDatabase();
      const items = results[0];
      if (items.length === 0) {
        return {
          status: 404,
          message: "No products found for the transaction" + transactionID
        };
      }

      const transactionProductList = [];
      for(let i = 0; i < items.length; i++) {
        transactionProductList.push(await this.object.setNew(items[i]));
      }
      return {
        status: 200,
        message: transactionProductList
      };
    } catch (error) {
        throw error;
    }
  }
}