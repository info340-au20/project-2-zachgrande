# SongNotes
## By: Zach Grande, Rebecca Haynes, Gideon Chia, Brendan Jacobsen, Jerray Wu
### INFO 340 Autumn 2020: Project 2

This repository contains code for an interactive web app, created for the _Client-Side Web Development_ course at the UW iSchool.

The site can be viewed at <https://info-340-project-2-6e95f.firebaseapp.com/>

# The Application
Our application is targeted at college students and young adults. Users can view a list of their journal entries, color-coded by how positive or negative their day was.

The first main interaction method with the application is to input journal entries. Users can input their thoughts for the day and rate their feelings as well as include a song choice to represent the day.

Our second main interaction method with the application is to allow users to expand each invididual entry to see more details about it. Furthermore, the user has the option to delete posts from their history.

We think combining journaling with an app catered towards young adults along with music and music therapy could make for a much more effective and engaging application than the current options available.

# The Code
### `AboutEntry.js`
Framework for a single expanded journal entry.

### `AboutUs.js`
An overview of our mission and goals.

### `App.js`
Main operating file for the project, handles page redirection.

### `Entry.js`
A single journal entry. This can be used to append to `JournalLog.js`.

### `Form.js`
Handles a new journal entry submission. Also renders `MoodSelect.js` to show mood options.

### `JournalLog.js`
Renders a list of one user's journal entries.

### `MoodSelect.js`
Presents the user with mood options to choose from, which are later reflected on individual entries.

### `NavigationBar.js`
Allows the user to change which page they are viewing.

### `Track.js`
Handles the fetch functionality to assign each entry a unique song.

### `history.js`
Allows the user to be redirected upon completion of various actions.

### `index.css`
Styling for the application.

### `index.js`
Initialize and run the application.