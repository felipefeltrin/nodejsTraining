import mysql from 'mysql2';
import 'dotenv/config';
import User from '../models/User.js';

export default class UserContoller {
  conn = mysql.createConnection({
    host: process.env.SQLHOST,
    user: process.env.SQLUSER,
    password: process.env.SQLPASSWORD
  });

  async connectToDatabase() {
    try {
      if(this.conn.state === 'disconnected'){
        this.conn.promise().connect();
        console.log('Connection started.');
      }
    } catch (error) {
      throw errror;
    }
  }

  async disconnectFromDatabase() {
    try {
      if(this.conn.state !== 'disconnected'){
        this.conn.promise().end();
        console.log('Connection closed.');
      }
    } catch (error) {
      throw errror;
    }
  }

  async getList() {
    try {
      const sql = "SELECT * FROM NodeJSTraining.Users";
      
      await this.connectToDatabase();
      const results = await this.conn.promise().query(sql);
      await this.disconnectFromDatabase();
      if (results[0].length === 0) {
        return "No users found";
      }
      return results[0];
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
        return "User not found for ID: " + ID;
      }
      return new User(results[0][0]);
    } catch (error) {
        throw error;
    }
  }
  
  async createUser(userData) {
    try {
      const user = new User();
      Object.keys(userData).forEach(field => {
        if(!user.fields.hasOwnProperty(field)) {
          throw `Invalid field ${field} detected on body`;
        }
      });
      const sql = "INSERT INTO NodeJSTraining.Users (FirstName, LastName, BirthDate) VALUES (?, ?, ?)";
      await this.connectToDatabase();
      const result = await this.conn.promise().query(sql, Object.values(userData));
      await this.disconnectFromDatabase();

      console.log(result[0].insertId);
      return result[0].insertId;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userData, ID) {
   try {
      let sql = "UPDATE NodeJSTraining.Users SET"
      let fieldCount = 0;
      Object.keys(userData).forEach(field => {
        if(User.fields.hasOwnProperty(field) && field != "ID") {
          fieldCount++;
          sql += `${userData[field]}, `
        }
      });
      console.log(params);
      sql += `WHERE ID = ?`;

      if(fieldCount === 0) {
        return "No valid fields were found to update";
      }

      await this.connectToDatabase();
      const result = await this.conn.promise().query(sql, ID);
      await this.disconnectFromDatabase();

      return result[0].affectedRows;
   } catch (error) {
    throw error;
   }
  }

  async deleteUser(ID) {
    try {
      const sql = "DELETE FROM NodeJSTraining.Users WHERE ID = ?";

      await this.connectToDatabase();
      const result = await this.conn.promise().query(sql, userData);
      await this.disconnectFromDatabase();

      return result[0].affectedRows;
    } catch (error) {
        throw error;
    }
  }
}