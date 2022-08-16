const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { isEmail } = require('validator');

const { getCurrentUser, updateUser } = require('../controllers/users');

userRouter.get('/me', getCurrentUser);

userRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().custom((value, error) => {
        if (isEmail(value)) {
          return value;
        }
        return error.message('Некорректный формат адреса');
      }),
    }),
  }),
  updateUser,
);

module.exports = userRouter;
