const db = require('../../config/database');
const BookDao = require('../dao/bookDao');
const bookDao = new BookDao(db);

const template = require('../views/template');

class BookController {
  static routes() {
    return {
      books: '/books',
      form: '/books/form',
      delete: '/books/:id',
      edit: '/books/form/:id',
    };
  }

  list() {
    return (req, res) => {
      bookDao
        .list()
        .then((books) => {
          res.marko(template.books.list, { books: books });
        })
        .catch((err) => console.log(err));
    };
  }

  form() {
    return (req, res) => {
      res.marko(template.books.form, { book: {} });
    };
  }

  insert() {
    return (req, res) => {
      bookDao
        .add(req.body)
        .then(res.redirect(BookController.routes().books))
        .catch((err) => console.log(err));
    };
  }

  remove() {
    return (req,res) => {
      const id = req.params.id;
      bookDao
        .remove(id)
        .then(() => {res.redirect(BookController.routes().books)})
        .catch((err) => console.log(err));
    }
  }
}

module.exports = BookController;
