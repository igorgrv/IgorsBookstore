const sqlite3 = require('sqlite3').verbose();
const bd = new sqlite3.Database('data.db');

const USERS_SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name VARCHAR(40) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)
`;

const INSERIR_USER_1 = `
INSERT INTO users (
    full_name,
    email,
    password
) SELECT 'Igor Romero', 'igorgrv@bookstore.com', '123' WHERE NOT EXISTS (SELECT * FROM users WHERE email = 'igorgrv@bookstore.com')
`;

const BOOKS_SCHEMA =
`
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT DEFAULT ('') NOT NULL
)
`;

const INSERIR_LIVRO_1 = `
INSERT INTO books (
    title,
    price,
    description
) SELECT 'Hands-on Node', 30.0, 'How to develop with Node.' WHERE NOT EXISTS (SELECT * FROM books WHERE title = 'Hands-on Node')
`;

const INSERIR_LIVRO_2 = `
INSERT INTO books (
    title,
    price,
    description
) SELECT 'Hands-on JavaScript', 40.0, 'How to develop with JavaScript.' WHERE NOT EXISTS (SELECT * FROM books WHERE title = 'Hands-on JavaScript')
`;

bd.serialize(() => {
    bd.run("PRAGMA foreign_keys=ON");
    bd.run(USERS_SCHEMA);
    bd.run(INSERIR_USER_1);
    bd.run(BOOKS_SCHEMA);
    bd.run(INSERIR_LIVRO_1);
    bd.run(INSERIR_LIVRO_2);

    bd.each("SELECT * FROM users", (err, usuario) => {
        console.log('User: ');
        console.log(usuario);
    });
});

process.on('SIGINT', () =>
    bd.close(() => {
        console.log('BD has gone!');
        process.exit(0);
    })
);

module.exports = bd;