import { DataTypes, Model, Optional } from "sequelize";
import { NotificationAttributes } from "../src/interface";
import { sequelize } from ".";

interface NotificationCreationAttributes
  extends Optional<NotificationAttributes, "id"> {}

interface NotificationInstance
  extends Model<NotificationAttributes, NotificationCreationAttributes>,
    NotificationAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export default sequelize.define<NotificationInstance>("Notifications", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
  },
});
