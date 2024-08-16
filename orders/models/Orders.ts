import { DataTypes, Model, Optional } from "sequelize";
import { OrderAttributes } from "../src/interface";
import { sequelize } from ".";

interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> {}

interface OrderInstance
  extends Model<OrderAttributes, OrderCreationAttributes>,
    OrderAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export default sequelize.define<OrderInstance>("Orders", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_line1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postal_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  invoice_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tracking_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  payment_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  delivery_note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address_line2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address_line3: { type: DataTypes.STRING, allowNull: true },
});
