const express = require('express');
const graphqlHTTP = require('express-graphql');
const dotenv = require('dotenv');

const schema = require('./schema/schema');
const app = express();

//Load env vars.
const PORT = process.env.PORT || 4000;

dotenv.config({ path: './config/config.env' });

app.use('/graphql', graphqlHTTP({
  schema
}));

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));
