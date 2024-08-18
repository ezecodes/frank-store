import { DataTypes, Model, Optional } from "sequelize";
import { UserAttributes } from "../src/interface";
import { sequelize } from ".";

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export default sequelize.define<UserInstance>("Users", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_role: {
    type: DataTypes.ENUM("customer", "seller"),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive", "blocked"),
    allowNull: false,
  },
  notification_types: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
});
