class HomeController {
    home(req, res, next) {
        res.send('Home Page is here');
    }
}

module.exports = new HomeController;