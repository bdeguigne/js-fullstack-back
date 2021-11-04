const mongoose = require('mongoose');
const app = require('./app');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL).then(() => {
  app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening to port ${process.env.PORT}`);
  });
});
