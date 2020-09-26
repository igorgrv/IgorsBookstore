const template = require('../views/templates');

class HomeController {
  static routes() {
    return {
      home: '/',
      login: '/login'
    };
  }

  home() {
    return (req, res) => {
      res.marko(template.base.home);
    };
  }

  login() {
    return (req, res) => {
      res.marko(template.base.login);
    };
  }
}

module.exports = HomeController;
