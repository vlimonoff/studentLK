const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate({ User, Programm, Discipline }) {
      Group.User = Group.hasMany(User, { foreignKey: 'groupId' });
      Group.Programm = Group.belongsTo(Programm, { foreignKey: 'programmId' });
      Group.Discipline = Group.hasMany(Discipline, { foreignKey: 'groupId' });
    }
  }
  Group.init(
    {
      groupName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      kurs: {
        type: DataTypes.INTEGER,
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
      modelName: 'Group',
    },
  );
  return Group;
};
