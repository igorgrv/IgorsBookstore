const { validationResult } = require('express-validator');

const db = require('../../config/database');
const BookDao = require('../dao/bookDao');
const bookDao = new BookDao(db);

const template = require('../views/templates');

class BookController {
  static routes() {
    return {
      authenticated: '/books*',
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

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return resp.marko(template.books.form, {
          book: req.body,
          errorsValidation: errors.array(),
        });
      }
      bookDao.add(req.body)
        .then(res.redirect(BookController.routes().books))
        .catch((err) => console.log(err));
    };
  }

  remove() {
    return (req, res) => {
      const id = req.params.id;
      bookDao
        .remove(id)
        .then(() => {
          res.redirect(BookController.routes().books);
        })
        .catch((err) => console.log(err));
    };
  }

  editForm() {
    return (req, res) => {
      const id = req.params.id;
      console.log('entrou no edit - id: ' + id);
      bookDao
        .findById(id)
        .then((book) => {
          console.log('book encontrado: ' + book);
          res.marko(template.books.form, { book: book });
        })
        .catch((err) => console.log(err));
    };
  }

  update() {
    return (req, res) => {
      bookDao
        .update(req.body)
        .then(res.redirect(BookController.routes().books))
        .catch((err) => console.log(err));
    };
  }
}

module.exports = BookController;
