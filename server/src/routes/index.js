const studentsRouter = require('./students');
const homeRouter = require('./home');
const authRouter = require('./auth')

function route(app) {
    app.use('/api/auth', authRouter);
    app.use('/student', studentsRouter);
    app.use('/', homeRouter);

}
module.exports = route;