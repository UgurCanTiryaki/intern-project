const express = require('express');

const sequelize = require('./config/database');
const { notFound } = require('./controllers/error');

const app = express();

app.use(notFound);

sequelize.sync().then(() => {
  app.listen(8080);
}).catch((error)=>{
  console.log(error);
});
