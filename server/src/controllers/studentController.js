class StudentController {
    //[GET] /student/create
    create(req, res, next) {
        res.send("get in student create page");
    }
}

module.exports = new StudentController;