import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import User from "./user.model.js";

const Vendor = sequelize.define(
  "Vendor",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id	:{
        type: DataTypes.UUID,
        allowNull: false,

    },
    vendor_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address : {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "pending", "suspended"),
      defaultValue: "active",
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailVerified: {
  type: DataTypes.BOOLEAN,
  defaultValue: false,
},

  },
  {
    tableName: "users",
    timestamps: true,
  }
);




// Associations
User.hasOne(Vendor, { foreignKey: "user_id", onDelete: "CASCADE" });
Vendor.belongsTo(User, { foreignKey: "user_id" });

export default Vendor;