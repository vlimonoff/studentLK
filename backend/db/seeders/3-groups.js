module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Groups',
      [
        {
          groupName: '4об-ПМИ/19',
          kurs: 4,
          programmId: 1,
        },
        {
          groupName: '4об-ПОмо-1/19',
          kurs: 4,
          programmId: 2,
        },
        {
          groupName: '4об-ПОмо-2/19',
          kurs: 4,
          programmId: 2,
        },
        {
          groupName: '4об-ПМИ/19',
          kurs: 4,
          programmId: 3,
        },
        {
          groupName: '4об-ПОмо-1/18',
          kurs: 4,
          programmId: 4,
        },
        {
          groupName: '4об-ПОмо-2/18',
          kurs: 4,
          programmId: 4,
        },
        {
          groupName: '1об-ПМИ/23',
          kurs: 1,
          programmId: 5,
        },
        {
          groupName: '1об-ПОмо-1/23',
          kurs: 1,
          programmId: 6,
        },
        {
          groupName: '1об-ПОмо-2/23',
          kurs: 1,
          programmId: 6,
        },
        {
          groupName: '1об-ПОмо-3/23',
          kurs: 1,
          programmId: 6,
        },
      ].map((item) => ({ ...item, createdAt: new Date(), updatedAt: new Date() })),
      {},
    );
  },
};
