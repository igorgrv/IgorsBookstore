const BookController = require('../controllers/bookController');
const bookController = new BookController();
const bookRoutes = BookController.routes();

module.exports = (app) => {
	app
		.route(bookRoutes.form)
			.get(bookController.form())
			.post(bookController.insert());

	app.get(bookRoutes.books, bookController.list());
	app.delete(bookRoutes.delete, bookController.remove());
};
