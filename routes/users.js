const userRouter = require('express').Router();

const { getUser, updateUser } = process.env;

userRouter.get('/me', getUser);

userRouter.patch('/me', updateUser);

module.exports = userRouter;
