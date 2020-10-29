const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
//console.log(process.env);

const app = require('./app');

// Start server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
