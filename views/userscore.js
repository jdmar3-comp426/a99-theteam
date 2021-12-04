document.addEventListener('DOMContentLoaded', () => {
    
    async function fetchScores(){
        const response = await fetch("http://localhost:3000/app/userscores")
        const scores = await response.json()
        return scores;
    }

    fetchScores().then(data => updateProfileView(data));


    function updateProfileView(scores) {
        let profile = document.getElementById("profile");
        profile.innerHTML = "";

        // create elements for each player
        for(let i=0; i<scores.length; i++) {
            let score = document.createElement("div");
            let time = document.createElement("div");
            score.classList.add("score");
            time.classList.add("date");
            score.innerText = scores[i].score;
            time.innerText = scores[i].datetime;

            let scoreRow = document.createElement("div");
            scoreRow.classList.add("row");
            scoreRow.appendChild(score);
            scoreRow.appendChild(time);
            profile.appendChild(scoreRow);
        }
    }
})