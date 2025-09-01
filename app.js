const express = require("express");
const app = express();
const cors = require('cors');
const setupRoutes = require('./router/base.router');
const config = require('./config');
const port = config.env.port;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routing 
setupRoutes(app);


// app.get('/hii', (req, res) => {
//     res.status(200).json({ message: 'Hello Afwan Latif' })
// });

app.listen(port, (req, res) => {
    console.log(`Server is running on port no ${port}`);
});

