/* eslint-disable object-curly-newline */
const professorRouter = require('express').Router();
const { Discipline, User, Group, Mark } = require('../../db/models');

professorRouter.post('/disciplines', async (req, res) => {
  try {
    const { professorId } = req.body;

    const disciplines = await Discipline.findAll({
      where: { professorId },
      include: [
        {
          model: Group,
          include: [
            {
              model: User,
            },
          ],
        },
        {
          model: Mark,
        },
      ],
    });

    res.status(200).json(disciplines);
    return;
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = professorRouter;
