const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Producto = sequelize.define('Producto', {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  nombre: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  precio: { 
    type: DataTypes.DECIMAL(10,2), 
    allowNull: false 
  }
}, {
  tableName: 'productos',
  timestamps: false
});

module.exports = Producto;
