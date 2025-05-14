import mysql from 'mysql2';
import 'dotenv/config';
import MD5 from 'md5';
import jwt from 'jsonwebtoken';

export default class BaseController {
  connConfig = {
    host: process.env.SQLHOST,
    user: process.env.SQLUSER,
    password: process.env.SQLPASSWORD
  };
  conn;
  
  async connectToDatabase() {
    try {
      this.conn = mysql.createConnection(this.connConfig);
      this.conn.connect();
      console.log('Connection started.');
    } catch (error) {
      throw error;
    }
  }

  async disconnectFromDatabase() {
    try {
      this.conn.end()
      this.conn.destroy();
      console.log('Connection closed.');
    } catch (error) {
      throw error;
    }
  }


  async authenticate(userData) {
    try {
      const sql = "SELECT * FROM NodeJSTraining.Users WHERE Username = ? AND Password = ?";
      
      await this.connectToDatabase();
      const results = await this.conn.promise().query(sql, [userData.Username, MD5(userData.Password).toString()]);
      await this.disconnectFromDatabase();
      if (results[0].length === 0) {
        return {
          status: 401,
          message: "Username or password is invalid"
        };
      }
      const user = results[0][0];
      const date = new Date();
      const expiration = date.setDate(date.getDate() + 30);
      const jwtData = {
        expiration: expiration,
        userId: user.ID
      }

      
      return {
        status: 200,
        message: {
          token: jwt.sign(jwtData, process.env.JWT_SECRET_KEY),
          expirationDate: expiration
        }
      };
    } catch (error) {
        throw error;
    }
  }

  async checkAuthentication(token) {
    try {
      const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
      const jwtSecretKey = process.env.JWT_SECRET_KEY;

      const verified = jwt.verify(token, jwtSecretKey);
      if (verified) {
        return true;
      } else {
        return {
          status: 401,
          message: "Invalid Authorization token provided"
        };
      }
    } catch (error) {
        throw error;
    }
  }
}