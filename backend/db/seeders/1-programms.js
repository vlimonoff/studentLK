module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Programms',
      [
        {
          number: '01.03.02',
          title: 'Прикладная математика и информатика',
          year: 2019,
        },
        {
          number: '44.03.01',
          title: 'Педагогическое образование',
          year: 2019,
        },
        {
          number: '01.03.02',
          title: 'Прикладная математика и информатика',
          year: 2018,
        },
        {
          number: '44.03.01',
          title: 'Педагогическое образование',
          year: 2018,
        },
        {
          number: '01.03.02',
          title: 'Прикладная математика и информатика',
          year: 2023,
        },
        {
          number: '44.03.01',
          title: 'Педагогическое образование',
          year: 2023,
        },
      ].map((item) => ({ ...item, createdAt: new Date(), updatedAt: new Date() })),
      {},
    );
  },
};
