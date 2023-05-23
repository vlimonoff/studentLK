const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Use extends Model {
    static associate({ User }) {
      Use.Student = Use.belongsTo(User, { foreignKey: 'studentId' });
    }
  }
  Use.init(
    {
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      mark: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Use',
    },
  );
  return Use;
};
