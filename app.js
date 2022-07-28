const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();

const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const errorsHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  family: 4,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signup', createUser);
app.post('/signin', login);

app.use('/users', auth, userRouter);
app.use('/movies', auth, movieRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Такого пути не существует'));
});

app.use(errorLogger);

app.use(errorsHandler);

app.listen(PORT);
