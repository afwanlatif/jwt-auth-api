const mongoose = require('mongoose');
mongoose.connect(process.env.Mongo_url)
    .then(() => {
        console.log('Database connected sucessfully');
    })
    .catch((err) => {
        console.log('Unable to connect DB', err);
    })

exports.mongo_connection = mongoose.connection;