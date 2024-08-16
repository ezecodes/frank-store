import { DataTypes, Model, Optional } from "sequelize";
import { OrderItemAttributes } from "../src/interface";
import { sequelize } from ".";

interface OrderItemCreationAttributes
  extends Optional<OrderItemAttributes, "id"> {}

interface OrderItemInstance
  extends Model<OrderItemAttributes, OrderItemCreationAttributes>,
    OrderItemAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export default sequelize.define<OrderItemInstance>("OrderItems", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
  },
  product_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  order_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  invoice_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currency: {
    type: DataTypes.CHAR(5),
    allowNull: false,
  },
});
