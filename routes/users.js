const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getCurrentUser, updateUser } = require('../controllers/users');

userRouter.get('/me', getCurrentUser);

userRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);

module.exports = userRouter;
