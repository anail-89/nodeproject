module.exports = (app) => {

    app.use((req, res, next) => {
        req.middleware = 10;
        next();
    });
    app.use('/posts', require('./routes/posts'));
    app.use('/users', require('./routes/users'));
    app.use('/', require('./routes/index'));
};