/* eslint-disable object-curly-newline */
const adminRouter = require('express').Router();
const { User, Use, Group, Programm } = require('../../db/models');

adminRouter
  .get('/users/students', async (req, res) => {
    try {
      const students = await User.findAll({
        where: { role: 'abiturient' },
        include: [{ model: Use }, { model: Group }],
      });
      res.status(200).json(students);
      return;
    } catch (error) {
      res.status(500).send(error);
    }
  })
  .post('/users/students', async (req, res) => {
    try {
      // eslint-disable-next-line max-len
      const { login, name, surname, patronymic, isMale, age, city, formOfEducation, directing } = req.body;

      const existingUser = await User.findOne({ where: { login } });

      if (existingUser) {
        res.status(401).send({ status: 401, message: 'Такой пользователь уже существует' });
        return;
      }

      const user = await User.create({
        login,
        name,
        surname,
        patronymic,
        isMale,
        role: 'student',
        password: login,
        age,
        city,
        formOfEducation,
        directing,
      });

      res.status(200).json(user);
      return;
    } catch (error) {
      res.status(500).send(error);
    }
  });

adminRouter.get('/users/professors', async (req, res) => {
  try {
    const professors = await User.findAll({ where: { role: 'professor' } });
    res.status(200).json({ status: 200, professors });
    return;
  } catch (error) {
    res.status(500).send(error);
  }
});

adminRouter.post('/users/exam', async (req, res) => {
  try {
    const { title, studentId, mark } = req.body;

    await Use.create({ title, studentId, mark });

    res.status(200).json({ status: 200 });
    return;
  } catch (error) {
    res.status(500).send(error);
  }
});

adminRouter.put('/users/group', async (req, res) => {
  try {
    const { studentId, groupId } = req.body;

    const student = await User.findOne({ where: { id: studentId } });
    await student.update({ groupId });
    await student.save();

    res.status(200).json({ status: 200 });
    return;
  } catch (error) {
    res.status(500).send(error);
  }
});

adminRouter.get('/users/groups', async (req, res) => {
  try {
    const groups = await Group.findAll({ include: [{ model: User }, { model: Programm }] });

    res.status(200).json(groups);
    return;
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = adminRouter;
