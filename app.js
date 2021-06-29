const express = require('express');
const passport = require('passport');

const { errorHandler, notFound } = require('./controllers/error');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const sequelize = require('./config/database');
require('./utils/others');

const app = express();

app.use(passport.initialize());

app.use('/auth', authRoutes);

app.use('/user', userRoutes);

app.use(notFound);

app.use(errorHandler);

sequelize.sync().then(() => {
  app.listen(8080);
}).catch((error) => {
  console.log(error);
});
