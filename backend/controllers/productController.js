import Product from "../models/Product.js";
import BaseController from "./baseController.js";

export default class ProductController extends BaseController {
  tableName = "Products";
  object = new Product();
  blockedUpdateFields = ["ID", "Name"];

  async subtractProductQuantity(ID, quantity) {
    try {
      const product = (await this.getByID(ID)).message;
      const sql = `UPDATE ${this.tableName} SET StockQuantity = ? - ? WHERE ID = ?`;

      await this.connectToDatabase();
      const results = await this.conn.promise().query(sql, [product.StockQuantity, quantity, ID]);
      await this.disconnectFromDatabase();

      if (results[0].affectedRows === 0) {
        return {
          status: 404,
          message: "No products found with ID" + ID
        };
      }
      
      return {
        status: 200,
        message: results[0].affectedRows
      };
    } catch (error) {
      throw error;
    }
  }

  async increaseProductQuantity(ID, quantity) {
    try {
      const product = (await this.getByID(ID)).message;
      const sql = `UPDATE ${this.tableName} SET StockQuantity = ? + ? WHERE ID = ?`;

      await this.connectToDatabase();
      const results = await this.conn.promise().query(sql, [product.StockQuantity, quantity, ID]);
      await this.disconnectFromDatabase();

      if (results[0].affectedRows === 0) {
        return {
          status: 404,
          message: "No products found with ID" + ID
        };
      }
      return {
        status: 200,
        message: results[0].affectedRows
      };
    } catch (error) {
        throw error;
    }
  }
}