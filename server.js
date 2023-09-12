const dotenv = require('dotenv');

const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

const mongoConnectionString = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(mongoConnectionString).then(() => {
  console.log('DB connection success');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
