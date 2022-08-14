const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/', (req, res) => res.send({ message: 'вы успешно авторизовались' }));
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      name: Joi.string().min(2).max(30).required(),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  }),
  login,
);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('Такого пути не существует'));
});

module.exports = router;
