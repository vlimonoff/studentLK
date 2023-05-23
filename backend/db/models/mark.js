const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Mark extends Model {
    static associate({ User, Discipline }) {
      Mark.Student = Mark.belongsTo(User, { foreignKey: 'studentId' });
      Mark.Professor = Mark.belongsTo(User, { foreignKey: 'professorId' });
      Mark.Discipline = Mark.belongsTo(Discipline, { foreignKey: 'disciplineId' });
    }
  }
  Mark.init(
    {
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      grade: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      professorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      disciplineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Discipline',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Mark',
    },
  );
  return Mark;
};
