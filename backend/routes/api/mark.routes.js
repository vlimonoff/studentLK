/* eslint-disable object-curly-newline */
const markRouter = require('express').Router();
const { Mark } = require('../../db/models');

markRouter.put('/', async (req, res) => {
  try {
    const { markId, grade } = req.body;

    const mark = await Mark.findOne({ where: { id: markId } });

    await mark.update({ grade });
    await mark.save();

    res.status(200).json({ status: 200, message: 'Ок' });
    return;
  } catch (error) {
    res.status(500).send(error);
  }
});

markRouter.post('/', async (req, res) => {
  try {
    const { studentId, grade, professorId, disciplineId } = req.body;

    await Mark.create({
      studentId,
      grade,
      professorId,
      disciplineId,
    });

    res.status(200).json({ status: 200, message: 'Ок' });
    return;
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = markRouter;
