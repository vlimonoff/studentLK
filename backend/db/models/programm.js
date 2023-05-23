const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Programm extends Model {
    static associate({ Group, Module }) {
      Programm.Group = Programm.hasMany(Group, { foreignKey: 'programmId' });
      Programm.Module = Programm.hasMany(Module, { foreignKey: 'programmId' });
    }
  }
  Programm.init(
    {
      number: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Programm',
    },
  );
  return Programm;
};
