module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Modules',
      [
        {
          title: 'Историко-философский',
          programmId: 1,
        },
        {
          title: 'Коммуникативный',
          programmId: 1,
        },
        {
          title: 'Здоровьесберегающий',
          programmId: 1,
        },
        {
          title: 'Математический анализ и дифференциальные уравнения',
          programmId: 1,
        },
        {
          title: 'Алгебра и геометрия',
          programmId: 1,
        },
        {
          title: 'Информационный',
          programmId: 1,
        },
        {
          title: 'Общематематический',
          programmId: 1,
        },
        {
          title: 'Математическое моделирование',
          programmId: 1,
        },
        {
          title: 'Компьютерные науки',
          programmId: 1,
        },
        {
          title: 'Научно-исследовательский',
          programmId: 1,
        },
        {
          title: 'Мировоззренческий',
          programmId: 2,
        },
        {
          title: 'Предметно-содержательный',
          programmId: 2,
        },
        {
          title: 'Методический',
          programmId: 2,
        },
        {
          title: 'Учебно-исследовательский',
          programmId: 2,
        },
        {
          title: 'Психолого-педагогический',
          programmId: 2,
        },
        {
          title: 'Фундаментальная математика',
          programmId: 2,
        },
        {
          title: 'Дополнительное образование',
          programmId: 2,
        },
        {
          title: 'Здоровьесберегающий',
          programmId: 2,
        },
        {
          title: 'Коммуникативный',
          programmId: 2,
        },
        {
          title: 'Общематематический',
          programmId: 2,
        },
      ].map((item) => ({ ...item, createdAt: new Date(), updatedAt: new Date() })),
      {},
    );
  },
};
