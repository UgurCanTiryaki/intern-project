const express = require('express');

const { errorHandler, notFound } = require('./controllers/error');
const authRoutes = require('./routes/auth');
const sequelize = require('./config/database');

const app = express();

app.use('/auth', authRoutes);

app.use(notFound);

app.use(errorHandler);

sequelize.sync().then(() => {
  app.listen(8080);
}).catch((error) => {
  console.log(error);
});
