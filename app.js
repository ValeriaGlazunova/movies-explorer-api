require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const allowedCors = {
  origin: [
    'https://glazunova.diploma.nomoredomains.xyz',
    'http://glazunova.diploma.nomoredomains.xyz',
    'https://praktikum.tk',
    'http://praktikum.tk',
    'http://localhost:3000',
  ],
  allowedHeaders: [
    'Content-Type',
    'Origin',
    'Referer',
    'Accept',
    'Authorization',
  ],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

const app = express();

const errorsHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');

const { NODE_ENV, PORT = 3000, MONGODB_SERVER } = process.env;

mongoose.connect(NODE_ENV === 'production' ? MONGODB_SERVER : 'mongodb://localhost:27017/bitfilmsdb', {
  family: 4,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use('*', cors(allowedCors));

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT);
