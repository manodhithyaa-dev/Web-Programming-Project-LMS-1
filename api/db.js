const mysql = require("mysql2");

const db = {
    host: "localhost",
    port: 3306,
    name: "web",
    user: "root",
    pass: "root"
};

const conn = mysql.createConnection({
    user: db.user,
    host: db.host,
    password: db.pass,
    database: db.name
});

conn.connect((err) => {
    if (err) throw err;
    console.log("DB Connected");
});

module.exports = conn;