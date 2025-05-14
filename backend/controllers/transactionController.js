import BaseController from "./baseController";

export default class TransactionController extends BaseController {
  tableName = "Transactions";
  object;
  blockedUpdateFields = ["ID", "TransactionDate", "UserID"];

  async listByUserId(userID) {
    try {
      const sql = `SELECT * FROM ${this.tableName}
                    WHERE UserId = ?`;
      
      await this.connectToDatabase();
      const results = await this.conn.promise().query(sql, userId);
      await this.disconnectFromDatabase();
      
      if (results[0].length === 0) {
        return {
          status: 404,
          message: "No transactions found for user" + userID
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

  async addProduct(ID, productID) {
    try {
      const sql = `INSERT INTO TransactionProducts (TransactionID, ProductID) VALUES (?, ?)`;
      
      await this.connectToDatabase();
      const results = await this.conn.promise().query(sql, [ID, productID]);
      await this.disconnectFromDatabase();
      
      if (results[0].length === 0) {
        return {
          status: 404,
          message: "Not found Transaction with ID" + ID
        };
      }

      return {
        status: 200,
        message: "Affected transactions: " + result[0].affectedRows
      };
    } catch (error) {
        throw error;
    }
  }

  async replaceProduct(ID, oldProductID, newProductID) {
    try {
      const sql = `UPDATE TransactionProducts SET ProductID = ? WHERE TransactionID = ? AND ProductID = ?`;
      
      await this.connectToDatabase();
      const results = await this.conn.promise().query(sql, [newProductID, ID, oldProductID]);
      await this.disconnectFromDatabase();
      
      if (results[0].length === 0) {
        return {
          status: 404,
          message: "Not found Transaction with ID" + ID
        };
      }

      return {
        status: 200,
        message: "Affected transactions: " + result[0].affectedRows
      };
    } catch (error) {
        throw error;
    }
  }
}