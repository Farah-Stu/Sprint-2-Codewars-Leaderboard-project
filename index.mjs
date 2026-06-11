import { getSortedUsers, parseUsernames } from "./leaderboardLogic.mjs";

const userInput = document.getElementById("usernames");
const fetchBtn = document.getElementById("fetch-btn");
const errorMessage = document.getElementById("error-message");
const leaderboardBody = document.getElementById("leaderboard-body");
const langSelect = document.getElementById("language-select");

let allUserData = [];

// remove any error message
userInput.addEventListener("input", () => {
  errorMessage.textContent = "";
  errorMessage.style.display = "none";
});

// fetch on Enter key
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fetchBtn.click();
  }
});

// fetch Button
fetchBtn.addEventListener("click", async function (e) {
  e.preventDefault();

  const usernames = parseUsernames(userInput.value);

  if (usernames.length === 0) {
    errorMessage.textContent = "Please enter at least one valid username";
    errorMessage.style.display = "block";
    return;
  }

  errorMessage.textContent = "";
  errorMessage.style.display = "none";
  leaderboardBody.innerHTML = "";

  const fetchedValidUsers = [];
  const invalidUsers = [];

  for (const username of usernames) {
    const apiUrl = `https://www.codewars.com/api/v1/users/${username}`;

    try {
      const response = await fetch(apiUrl);

      if (response.ok) {
        const userData = await response.json();
        fetchedValidUsers.push(userData);
        continue; // skip to next user name
      } else if (response.status === 404) {
        invalidUsers.push(username);
        continue;
      } else if (!response.ok) {
        errorMessage.textContent = `API error for ${username}.`;
        errorMessage.style.display = "block";
      }
    } catch (error) {
      errorMessage.textContent = error.message;
      errorMessage.style.display = "block";
    }
  }
  // check for invalid users
  if (invalidUsers.length > 0) {
    errorMessage.textContent = `These users were not found : ${invalidUsers.join(", ")}`;
    errorMessage.style.display = "block";
  }

  if (fetchedValidUsers.length === 0) return;
  allUserData = fetchedValidUsers;
  console.log(allUserData[0]);
  populateDropdown(allUserData);
  renderLeaderboard(allUserData, langSelect.value);
});

// Changing DropDown

langSelect.addEventListener("change", () => {
  if (allUserData.length === 0) return;
  renderLeaderboard(allUserData, langSelect.value);
});

function populateDropdown(users) {
  const languageSet = new Set();

  users.forEach((user) => {
    Object.keys(user.ranks.languages || {}).forEach((lang) => {
      languageSet.add(lang);
    });
  });

  langSelect.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "overall";
  defaultOption.textContent = "overall";
  langSelect.appendChild(defaultOption);

  Array.from(languageSet)
    .sort()
    .forEach((lang) => {
      const option = document.createElement("option");
      option.value = lang;
      option.textContent = lang;
      langSelect.appendChild(option);
    });
}
//display leaderboard

function renderLeaderboard(users, selectedLanguage) {
  leaderboardBody.innerHTML = "";

  const filteredUsers = getSortedUsers(users, selectedLanguage);

  if (filteredUsers.length === 0) return;

  const highScore =
    selectedLanguage === "overall"
      ? filteredUsers[0].ranks.overall?.score
      : filteredUsers[0].ranks.languages[selectedLanguage]?.score;

  //loop through users
  filteredUsers.forEach((user) => {
    const row = document.createElement("tr");

    const usernameCell = document.createElement("td");
    usernameCell.textContent = user.username;

    const clanCell = document.createElement("td");
    clanCell.textContent = user.clan;

    const scoreCell = document.createElement("td");
    const score =
      selectedLanguage === "overall"
        ? user.ranks.overall?.score || 0
        : user.ranks.languages[selectedLanguage]?.score || 0;

    scoreCell.textContent = score;
    row.appendChild(usernameCell);
    row.appendChild(clanCell);
    row.appendChild(scoreCell);

    if (score === highScore) {
      row.classList.add("top-scorer");
    }

    leaderboardBody.appendChild(row);
  });
}
