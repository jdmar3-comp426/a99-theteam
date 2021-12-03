// This ensures that things do not fail silently but will throw errors instead.
"use strict";
// Require better-sqlite.
const Database = require('better-sqlite3');

// Connect to a database or create one if it doesn't exist yet.
const db = new Database('user.db');

// Is the database initialized or do we need to initialize it?
const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table';`);
let row = stmt.get();
if (row === undefined) {
// Echo information about what you are doing to the console.
    console.log('Your database appears to be empty. I will initialize it now.');
// Set a const that will contain your SQL commands to initialize the database.
    const sqlInit = `
        CREATE TABLE userinfo ( id INTEGER PRIMARY KEY, user TEXT, pass TEXT );
        CREATE TABLE scores (id INTEGER PRIMARY KEY, user_id INTEGER, score INTEGER, datetime TEXT, FOREIGN KEY(user_id) REFERENCES userinfo(id));
        CREATE TABLE login_history (id INTEGER PRIMARY KEY, user_id INTEGER, datetime TEXT, FOREIGN KEY(user_id) REFERENCES userinfo(id));
        INSERT INTO userinfo (user, pass) VALUES ('admin','21232f297a57a5a743894a0e4a801fc3'), ('test','9241818c20435c6672dac2c4b6e6c071');
    `;
// Execute SQL commands that we just wrote above.
    db.exec(sqlInit);
// Echo information about what we just did to the console.
    console.log('Your database has been initialized with a new table and two entries containing a username and password.');
} else {
// Since the database already exists, echo that to the console.
    console.log('Database exists.')
}

const insertScores = `
    INSERT OR IGNORE INTO scores (id, user_id, score, datetime) VALUES (1, 1, 300, '11/27/2021 15:20');
    INSERT OR IGNORE INTO scores (id, user_id, score, datetime) VALUES (2, 1, 370, '11/30/2021 9:00');
    INSERT OR IGNORE INTO scores (id, user_id, score, datetime) VALUES (3, 1, 500, '10/30/2021 10:30');
    INSERT OR IGNORE INTO scores (id, user_id, score, datetime) VALUES (4, 1, 400, '11/20/2021 12:30');
`;

db.exec(insertScores);
// Export all of the above as a module so that we can use it elsewhere.
module.exports = db