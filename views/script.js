
document.addEventListener('DOMContentLoaded', () => {
    // let scores = [
    //     {name: "Player 1", score: 300},
    //     {name: "Player 2", score: 370},
    //     {name: "Player 3", score: 500},
    //     {name: "Player 4", score: 430},
    //     {name: "Player 5", score: 340},
    // ];

    async function fetchScores(){
        const response = await fetch("http://localhost:3000/app/scores/")
        const scores = await response.json()

        return scores;

    }

    fetchScores().then(data => updateLeaderboardView(data));

    //dbscores is a list of objects with properties for id, user_id, score, datetime, user.

    // console.log(scores)

    function updateLeaderboardView(scores) {
        let leaderboard = document.getElementById("leaderboard");
        leaderboard.innerHTML = "";

        // scores.sort(function(a, b){ return b.score - a.score  });
        let elements = []; // we'll need created elements to update colors later on
        // create elements for each player
        for(let i=0; i<scores.length; i++) {
            let name = document.createElement("div");
            let score = document.createElement("div");
            name.classList.add("name");
            score.classList.add("score");
            name.innerText = scores[i].user;
            score.innerText = scores[i].score;

            let scoreRow = document.createElement("div");
            scoreRow.classList.add("row");
            scoreRow.appendChild(name);
            scoreRow.appendChild(score);
            leaderboard.appendChild(scoreRow);

            elements.push(scoreRow);

        }

        let colors = ["gold", "silver", "#cd7f32"];
        for(let i=0; i < 3; i++) {
            elements[i].style.color = colors[i];
        }
    }

    // updateLeaderboardView();
    // function randomize() {
    //     for(var i=0; i<scores.length; i++) {
    //         scores[i].score = Math.floor(Math.random() * (600 - 300 + 1)) + 300;
    //     }
    //     // when your data changes, call updateLeaderboardView
    //     updateLeaderboardView();
    // }
})