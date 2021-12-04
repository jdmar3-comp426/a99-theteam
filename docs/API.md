|    Endpoint           | Method |                                  Description                                             |
|-----------------------|--------|------------------------------------------------------------------------------------------|
| /app/user/            | GET    |  Get all information from the current user                                               |
| /app/scores           | GET    |  Get the top 10 scores from the database from fastest to slowest (Max 10)                |
| /app/userscores       | GET    |  Get all of the scores from a certain user                                               |
| /app/user/:id         | GET    |  Get all information from a particular user                                              |
| /app/users            | GET    |  Get user data from every user                                                           |
| /app/                 | GET    |  Root endpoint                                                                           |
| /leaderboard          | GET    |  If authorized/signed in, redirect to the leaderboard screen                             |
| /profile              | GET    |  If authorized/signed in, redirect to the profile screen                                 |
| /index                | GET    |  If authorized/signed in, redirect to the game screen                                    |
| /logout               | GET    |  Destory the current session and log the user out. Return to login screen                |
| /                     | GET    |  If the user is signed in go to home screen, if not ask o login/create account           |
| /login                | POST   |  Let the user input information to sign in, where it is validated                        |
| /create_account       | POST   |  Create a new user in the database                                                       |
| /app/new/score        | POST   |  Add a new score for a particular user                                                   |
| /app/update/user/:id/ | PATCH  |  Update a certain user                                                                   |
| /app/delete/user/:id  | DELETE |  Delete a certain user                                                                   |
