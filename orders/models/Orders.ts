import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";

@Table({
  tableName: "orders",
  timestamps: true,
  modelName: "Orders",
})
export class Orders extends Model<Orders> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "Pending",
  })
  status!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address_line1!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  state!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  postal_code!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  customer_id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  invoice_id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tracking_id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  payment_id!: string | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  additional_info!: string | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  delivery_note!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address_line2!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address_line3!: string | null;
}
export default Orders;
