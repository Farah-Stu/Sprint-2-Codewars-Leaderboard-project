export function getSortedUsers(users, selectedLanguage) {
    
  const filteredUsers = users.filter((user) => {
    if (selectedLanguage === "overall") {
      return user.ranks.overall?.score;
    }
    return user.ranks.languages[selectedLanguage]?.score;
  });

  //Sort them by score (highest → lowest)

  const sortedUsers = filteredUsers.sort((a, b) => {
    const scoreA =
      selectedLanguage === "overall"
        ? a.ranks.overall?.score || 0
        : a.ranks.languages?.[selectedLanguage]?.score || 0;

    const scoreB =
      selectedLanguage === "overall"
        ? b.ranks.overall?.score || 0
        : b.ranks.languages?.[selectedLanguage]?.score || 0;

    return scoreB - scoreA;
  });

  return sortedUsers;
}

// Takes a comma‑separated string of usernames
// and returns a clean array of trimmed, non‑empty names.
export function parseUsernames(input) {
  return input
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name !== "");
}
