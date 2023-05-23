const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    static associate({ Programm, Discipline }) {
      Module.Programm = Module.belongsTo(Programm, { foreignKey: 'programmId' });
      Module.Discipline = Module.hasMany(Discipline, { foreignKey: 'moduleId' });
    }
  }
  Module.init(
    {
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      programmId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Programm',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Module',
    },
  );
  return Module;
};
