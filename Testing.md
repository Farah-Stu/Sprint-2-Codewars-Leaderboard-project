 TESTING.md – Codewars Leaderboard Project

1. User Input (Comma-Separated Usernames)

I tested entering multiple usernames separated by commas (e.g. CodeYourFuture,SallyMcGrath,40thieves) and clicking “Fetch”.

The application correctly split the input into individual usernames.
Each username was processed and requested from the Codewars API.
The leaderboard populated with valid users only

2. Fetching Data from Codewars API

I tested both valid and invalid usernames.

Valid usernames successfully returned data from the API

Invalid usernames triggered an error message:

These users were not found: <username>

The app still displayed valid users even when some usernames were invalid

3. Dropdown Language Selection

I tested the dropdown for selecting ranking type.

All available languages plus “Overall” were displayed
Selecting a language immediately updated the leaderboard
No page refresh was required

4. Default Ranking View

I verified that after fetching users:

The leaderboard automatically displays Overall ranking
No manual selection is required initially

5. Table Data Display

I tested that the leaderboard table renders correctly.

Columns for Username, Clan, and Score are displayed correctly
Data matches the selected ranking type (Overall or language-specific)

6. Sorting (Highest → Lowest Score)

I tested sorting behaviour manually and through automated tests.

Users are sorted in descending order of score
Highest scoring users appear at the top of the table
Sorting works for both Overall and language rankings

7. Filtering Users Without Language Scores

I tested selecting languages where some users had no score.

Users without a score in the selected language are excluded
Only users with valid scores are displayed

8. Top User Highlight

I verified visual highlighting of the top user.

The highest scoring user is highlighted using the top-scorer CSS class
Highlight updates correctly when sorting 

9. Accessibility Testing

Accessibility was tested using Chrome Lighthouse. The application achieved a score of 100 in Accessibility, confirming that it meets standard accessibility guidelines.

In addition, snapshot testing was used to ensure the UI renders consistently and does not unintentionally change over time.

10. Unit Tests

Unit tests in leaderboard.test.mjs verify the getSortedUsers() function:

Sorting users by overall score (descending)
Sorting users by language score (descending)
Filtering out users without selected language scores
Returning an empty array when no users match the selected language

All tests pass successfully using: npm test

11. Invalid User Handling

I tested entering both valid and invalid usernames together.

Invalid usernames are reported with an error message
Valid users are still displayed correctly

12. Network Error Handling

I tested by disabling the internet connection.

The app displays:

Network error. Please check your internet connection.

The application does not crash and handles the failure gracefully
