import { getSortedUsers, parseUsernames } from "./leaderboardLogic.mjs";

const mockUsers = [
  {
    username: "zara",
    ranks: {
      overall: { score: 300 },
      languages: {
        javascript: { score: 120 },
        python: { score: 80 },
      },
    },
  },
  {
    username: "mike",
    ranks: {
      overall: { score: 100 },
      languages: {
        javascript: { score: 50 },
      },
    },
  },
  {
    username: "lena",
    ranks: {
      overall: { score: 200 },
      languages: {
        python: { score: 90 },
      },
    },
  },
];

test("sort users by overall score from highest to lowest", () => {
  const result = getSortedUsers(mockUsers, "overall");
  const usernames = result.map((u) => u.username);
  expect(usernames).toEqual(["zara", "lena", "mike"]);
});

test("returns empty array when no users have the selected language", () => {
  const result = getSortedUsers(mockUsers, "ruby");
  expect(result).toEqual([]);
});

test("splits simple comma-separated usernames", () => {
  const result = parseUsernames("alice,bob,charlie");
  expect(result).toEqual(["alice", "bob", "charlie"]);
});

test("trims spaces around usernames", () => {
  const result = parseUsernames("  alice ,  bob , charlie  ");
  expect(result).toEqual(["alice", "bob", "charlie"]);
});

test("removes empty entries caused by extra commas", () => {
  const result = parseUsernames("alice,,bob,,,charlie");
  expect(result).toEqual(["alice", "bob", "charlie"]);
});

test("returns empty array when input is empty or only commas", () => {
  const result = parseUsernames(" , , , ");
  expect(result).toEqual([]);
});

test("handles usernames with numbers and symbols", () => {
  const result = parseUsernames("user123, ninja_99, coder-elite");
  expect(result).toEqual(["user123", "ninja_99", "coder-elite"]);
});

test("handles emoji usernames", () => {
  const result = parseUsernames("🔥warrior, coder💻, ninja🥷");
  expect(result).toEqual(["🔥warrior", "coder💻", "ninja🥷"]);
});
