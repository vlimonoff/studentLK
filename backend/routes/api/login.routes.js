const loginRouter = require('express').Router();
const { User } = require('../../db/models');

loginRouter.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    let existingUser = await User.findOne({
      where: { login },
      include: [User.Group, User.Department],
    });
    existingUser = existingUser.dataValues;

    if (!existingUser) {
      res.status(401).json({ status: 401, message: 'Неверный логин.' });
      return;
    }

    if (existingUser.password !== password) {
      res.status(401).json({ status: 401, message: 'Неверный пароль.' });
      return;
    }

    req.session.userId = existingUser.id;
    res.status(200).json(existingUser);
    return;
  } catch (error) {
    res.status(500).send(error);
  }
});

loginRouter.get('/logout', async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('user_sid');
    res.status(200).json({ status: 200, message: 'Сессия удалена.' });
    return;
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = loginRouter;
