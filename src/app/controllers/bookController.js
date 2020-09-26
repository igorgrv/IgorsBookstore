class BookController {

  static routes() {
    return {
      books: '/books',
      form: '/books/form',
    };
	}

}

module.exports = BookController;
