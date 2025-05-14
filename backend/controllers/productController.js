import Product from "../models/Product.js";
import BaseController from "./baseController.js";

export default class ProductController extends BaseController {
  tableName = "Products";
  object = new Product();
  blockedUpdateFields = ["ID", "Name"];

  async getByTransactionID(transactionID) {
    try {
      const sql = `SELECT P.* FROM ${this.tableName} P
                    JOIN TransactionProducts TP
                    ON TP.ProductID = P.ID
                    WHERE TransactionID = ?`;
      
      await this.connectToDatabase();
      const results = await this.conn.promise().query(sql, transactionID);
      await this.disconnectFromDatabase();

      if (results[0].length === 0) {
        return {
          status: 404,
          message: "No products found for the transaction" + transactionID
        };
      }

      return {
        status: 200,
        message: results[0]
      };
    } catch (error) {
        throw error;
    }
  }
}