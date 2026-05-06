const players = [
  {
    userId: 1000,
    username: "PlayerOne",
    highscore: 50000
  },

  {
    userId: 1001,
    username: "NoobMaster",
    highscore: 45000
  },

  {
    userId: 1002,
    username: "Shadow",
    highscore: 70000
  },

  {
    userId: 1003,
    username: "DragonX",
    highscore: 65000
  }
];

const leaderboardBody =
  document.getElementById("leaderboard-body");

const searchInput =
  document.getElementById("search-input");

function renderTable(data) {

  leaderboardBody.innerHTML = "";

  data.forEach(player => {

    leaderboardBody.innerHTML += `
      <tr>
        <td>${player.userId}</td>
        <td>${player.username}</td>
        <td>${player.highscore}</td>
      </tr>
    `;

  });

}

searchInput.addEventListener("input", () => {

  const keyword =
    searchInput.value.toLowerCase();

  const filteredPlayers =
    players.filter(player => {

      return player.username
        .toLowerCase()
        .includes(keyword);

    });

  renderTable(filteredPlayers);

});

renderTable(players);
