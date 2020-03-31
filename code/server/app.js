const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const schema = require('./schema/schema');
const app = express();

//Load env vars.
const PORT = process.env.PORT || 4000;
const dbuser = 'rakeshsherwal';
const password = 'mlab007';

// Connect to mlab books db
mongoose.connect(`mongodb://${dbuser}:${password}@ds119110.mlab.com:19110/gql-books`);
mongoose.connection.once('open', () => {
  console.log('Connected to mlab db...');

})
dotenv.config({ path: './config/config.env' });

app.use(cors());

app.use('/graphql', graphqlHTTP({
  graphiql: 1,
  schema
}));

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));
