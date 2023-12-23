// const home = require("../resources/views/home.html")
const path = require('path');

class HomeController {
    home(req, res, next) {
        res.send('Home Page is here');
        // const filePath = path.join(__dirname, '../resources/views/home.html');
        // res.sendFile(filePath);
    }
}

module.exports = new HomeController;