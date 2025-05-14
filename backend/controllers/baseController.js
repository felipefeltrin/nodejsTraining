import mysql from 'mysql2';
import 'dotenv/config';
import MD5 from 'md5';
import jwt from 'jsonwebtoken';

export default class BaseController {
  connConfig = {
    host: process.env.SQLHOST,
    user: process.env.SQLUSER,
    password: process.env.SQLPASSWORD,
    database: process.env.SQLDATABASE
  };
  conn;

  object = new Object();
  blockedUpdateFields = ["ID"];
  
  //SQL connection methods
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
  
  //generic SQL query methods
  async getList() {
    try {
      const sql = `SELECT * FROM ${this.tableName}`;
      
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
      const sql = `SELECT * FROM ${this.tableName} WHERE ID = ?`;
      
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

  async create(data) {
    try {
      Object.keys(data).forEach(field => {
        if(!this.object.hasOwnProperty(field)) {
          throw `Invalid field ${field} detected on body`;
        }
        if(field == "Password") {
          data[field] = MD5(data[field]).toString();
        }
      });
      let paramsString = "";
      let insertFieldString = "";
      Object.keys(this.object).forEach(insertField => {
        if(insertField != "ID"){
          insertFieldString += insertField + ", ";
          paramsString += "?, "
        }
      });
      paramsString = paramsString.replace(/(, $)/g, "");
      insertFieldString = insertFieldString.replace(/(, $)/g, "");

      const sql = `INSERT INTO ${this.tableName} (${insertFieldString}) VALUES (${paramsString})`;
      await this.connectToDatabase();
      const result = await this.conn.promise().query(sql, Object.values(data));
      await this.disconnectFromDatabase();

      return {
        status: 200,
        message: result[0].insertId
      };
    } catch (error) {
      throw error;
    }
  }

  async update(userData, ID) {
    try {
      let sql = `UPDATE ${this.tableName} SET `
      let fieldCount = 0;
      Object.keys(userData).forEach(field => {
        if(this.object.hasOwnProperty(field) && !this.blockedUpdateFields.includes(field)) {
          fieldCount++;
          sql += `${field} = '${userData[field]}', `
        }
      });
      sql = sql.replace(/(, $)/g, "");
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
        message: "Affected rows: " + result[0].affectedRows
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(ID) {
    try {
      const sql = `DELETE FROM ${this.tableName} WHERE ID = ?`;

      await this.connectToDatabase();
      const result = await this.conn.promise().query(sql, ID);
      await this.disconnectFromDatabase();

      return {
        status: 200,
        message: "Affected rows: " + result[0].affectedRows
      };
    } catch (error) {
      throw error;
    }
  }

  //authentication methods
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