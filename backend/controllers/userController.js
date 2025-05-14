import User from '../models/User.js';
import BaseController from './baseController.js';
export default class UserContoller extends BaseController {
  tableName = "Users";
  object = new User();
  blockedUpdateFields = ["ID", "birthDate"]
}