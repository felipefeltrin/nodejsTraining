import User from '../models/User.js';
import BaseController from './baseController.js';
export default class UserContoller extends BaseController {
  async getList() {
    try {
      const sql = "SELECT * FROM NodeJSTraining.Users";
      
      await this.connectToDatabase();
      const results = await this.conn.promise().query(sql);
      await this.disconnectFromDatabase();
      if (results[0].length === 0) {
        return {
          status: 404,
          message: "No users found"
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

  async getByID(ID) {
    try {
      const sql = "SELECT * FROM NodeJSTraining.Users WHERE ID = ?";
      
      await this.connectToDatabase();
      const results = await this.conn.promise().query(sql, ID);
      await this.disconnectFromDatabase();
      if (results[0].length === 0) {
        return {
          status: 404,
          message: "User not found for ID: " + ID
        };
      }
      
        return {
          status: 200,
          message: new User().setUser(results[0][0])
        };
    } catch (error) {
        throw error;
    }
  }
  
  async createUser(userData) {
    try {
      const user = new User();
      Object.keys(userData).forEach(field => {
        if(!user.hasOwnProperty(field)) {
          throw `Invalid field ${field} detected on body`;
        }
      });
      const sql = "INSERT INTO NodeJSTraining.Users (FirstName, LastName, BirthDate) VALUES (?, ?, ?)";
      await this.connectToDatabase();
      const result = await this.conn.promise().query(sql, Object.values(userData));
      await this.disconnectFromDatabase();

      return {
        status: 200,
        message: result[0].insertId
      };
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userData, ID) {
   try {
     const user = new User();
      const blockedFields = ["ID", "birthDate"]
      let sql = "UPDATE NodeJSTraining.Users SET "
      let fieldCount = 0;
      Object.keys(userData).forEach(field => {
        if(user.hasOwnProperty(field) && !blockedFields.includes(field)) {
          fieldCount++;
          sql += `${field} = '${userData[field]}', `
        }
      });
      sql = sql .replace(/(, $)/g, "");
      sql += ` WHERE ID = ?`;
      if(fieldCount === 0) {
        return {
          status: 406,
          message: "No valid fields were found to update"
        };
      }

      await this.connectToDatabase();
      const result = await this.conn.promise().query(sql, ID);
      await this.disconnectFromDatabase();

      return {
        status: 200,
        message: "Affected users: " + result[0].affectedRows
      };
   } catch (error) {
    throw error;
   }
  }

  async deleteUser(ID) {
    try {
      const sql = "DELETE FROM NodeJSTraining.Users WHERE ID = ?";

      await this.connectToDatabase();
      const result = await this.conn.promise().query(sql, ID);
      await this.disconnectFromDatabase();

      return {
        status: 200,
        message: "Affected users: " + result[0].affectedRows
      };
    } catch (error) {
        throw error;
    }
  }
}