const express = require('express');
const graphqlHTTP = require('express-graphql');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const app = express();
app.use('/graphql', graphqlHTTP({

}));

//Load env vars.
const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));
