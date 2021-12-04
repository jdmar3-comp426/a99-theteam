Database is implemented in SQLite. 

Table Structure:

userinfo {
  id INTEGER AUTOINCREMENT PRIMARY KEY,
  user TEXT,
  pass TEXT
}

*Passwords are hashed using the md5 library. *

login_history {
  id INTEGER AUTOINCREMENT PRIMARY KEY, 
  user_id INTEGER (FOREIGN KEY),
  datetime TEXT,
}

scores {
  id INTEGER AUTOINCREMENT PRIMARY KEY,
  user_id INTEGER (FOREIGN KEY),
  score INTEGER,
  datetime TEXT
}
