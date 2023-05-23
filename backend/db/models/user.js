const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({
      Group, Department, Discipline, Mark, Use,
    }) {
      User.Group = User.belongsTo(Group, { foreignKey: 'groupId' });
      User.Department = User.belongsTo(Department, { foreignKey: 'departmentId' });
      User.Discipline = User.hasMany(Discipline, { foreignKey: 'professorId' });
      User.StudentMark = User.hasMany(Mark, { foreignKey: 'studentId' });
      User.ProfessorMark = User.hasMany(Mark, { foreignKey: 'professorId' });
      User.Use = User.hasMany(Use, { foreignKey: 'studentId' });
    }
  }
  User.init(
    {
      login: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      surname: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      patronymic: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isMale: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      role: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      age: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      city: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      formOfEducation: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      directing: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Groups',
          key: 'id',
        },
      },
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Departments',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
