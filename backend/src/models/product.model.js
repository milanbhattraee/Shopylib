import { DataTypes } from "sequelize";
import sequelize from "../db/db";


const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  vendorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'vendors',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.UUID,
    references: {
      model: 'categories',
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
  brandId: {
    type: DataTypes.UUID,
    references: {
      model: 'brands',
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: [],
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  discount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  averageRating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  flashSaleId: {
    type: DataTypes.UUID,
    references: {
      model: 'flashSales',
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
  flashSalePrice: {
    type: DataTypes.FLOAT,
  },
  bestMatchScore: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'products',
  timestamps: true,
});

export default Product
