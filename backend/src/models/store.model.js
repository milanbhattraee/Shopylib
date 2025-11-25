import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import User from "./user.model.js";
import Vendor from "./vendor.model.js"; 



const Store = sequelize.define(
  "Store",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    vendor_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    store_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    storeDescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    storeUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bannerImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    storeAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "pending", "suspended"),
      defaultValue: "active",
    },
   

  },
  {
    tableName: "stores",
    timestamps: true,
  }
);

// Associations
Vendor.hasMany(Store, { foreignKey: "vendor_id", onDelete: "CASCADE" });
Store.belongsTo(Vendor, { foreignKey: "vendor_id" });

export default Store;
