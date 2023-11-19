const studentsRouter = require('./students');
const homeRouter = require('./home');

function route(app) {
    app.use('/student', studentsRouter);
    app.use('/', homeRouter);

}
module.exports = route;