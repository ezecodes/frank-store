import { sequelize } from "../models";
import Users from "../models/Users";
import { UserAttributes } from "./interface";
import Queue from "./queue";
import { PublisherQueues } from "./utils";

export default class UserService {
  static async create_user(user: UserAttributes) {
    const cU = await Users.create(
      { ...user, status: "active" },
      { returning: true }
    );
    Queue.publishMessage(PublisherQueues.UserCreated, cU);
  }
}
