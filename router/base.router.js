const UserRouter = require('./user.router');

const setupRoutes = (app) => {
    app.use('/user', UserRouter);
};

module.exports = setupRoutes;

