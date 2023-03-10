const express = require('express');
const app = express();
app.use(express.json());


const  authRouter  = require('./src/routes/authRoutes');
app.use('/', authRouter);


app.listen(4000, () => {
    console.log("server is running on port 4000");
})