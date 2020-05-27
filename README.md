[![Codeship Status for freerangeandy/tab-loom](https://app.codeship.com/projects/b2560a10-6ee0-0138-6377-1e517a23528f/status?branch=master)](https://app.codeship.com/projects/395067)

# Tab Loom
A virtual sketchbook in ReactJS and Ruby on Rails for creating guitar tablature with clickable chord and fretboard inputs

## Getting Started
### Prerequisites
You will need to have the following installed (either the specified version or later) on your local development machine in order to host a functional instance of this application:
* Ruby v2.6.5
* Node v11.15.0
* yarn v1.22.4
* RubyGem v3.03
* PostgreSQL 12

### Installing
After cloning the repository to a local directory, open a terminal window, navigate to the root directory of the repository, and execute the following commands:
```
yarn install
```
```
bundle install
```
Troubleshooting: If the Ruby Gems don't install successfully, try running `bundle exec bundle install` instead of `bundle install`. You can also try running the `yarn install` command before the `bundle install` command.

### Database setup
Note: The Rails aspect of this application assumes that it will be accessing a Postgres database. If you prefer to use an alternative like SQLite, you should make appropriate changes to the configuration file, config/database.yml. Otherwise, continue as described below:

Assuming Postgres installed successfully, open the Postgres app and click preferences to start Postgres automatically on logging in to your local machine. Alternatively, you could manually start Postgres before using this application.

To initialize the database tables used by the application, open a terminal window and run the following command:
```
bundle exec rake db:create && bundle exec rake db:migrate
```
If those commands ran successfully, Postgres should be hosting a `tab-loom_development` database containing `tablatures` and `users` tables.

## Running the Application
### Hosting
To host an instance of this application on a local server, open a terminal window in the root directory of the application and run the following command to start the Node server:
```
yarn start
```
If the server starts up successfully, the last line of the ensuing console output should read `webpack: Compiled successfully.`

Open another terminal window and run the following command to start the Rails server:
```
rails s
```
If the server starts up successfully, the 2nd-to-last line of the ensuing console output should read `Listening on tcp://localhost:3000`.

Both servers are required to be running for the application to function. Keying `Ctrl-C` into either terminal window will bring down that server and make the application inaccessible/non-functional.

## Usage
Open a browser window and navigate to `http://localhost:3000/` to view the Tab Loom entry page. Functionality is disabled for a user until they have created a profile and signed in.
* User Profile  
  To create a profile, click on the 'Sign Up' link in the upper right corner, fill out the required information in the form that appears, then click 'Sign up' to submit the form. You'll be redirected back to the main page with app functionality enabled. The steps are the same if you're signing in to an existing profile, except you would click 'Sign In' from the main screen and 'Sign In' after filling out the user profile form.

  To sign out of your current profile, click 'Sign Out' in the upper right corner, and the main page functionality will be disabled.

* Saving  
  To save the current state of your tablature content and title, either press the 'Save' button in the center pane or press 'Enter' on your keyboard while focused on the tab editor or title input field. **Important** It is highly recommended you save your work before creating or viewing another tab (as described below) in your index so your unsaved edits are not lost.

* Tab Index  
  The left sidebar displays a list of the current user's saved tabs.  
  * Create new tabs  
    A new tab is displayed by default for a user without any saved tabs. To create a new tab at any time, click on '+ New Tab' and a blank, untitled tab will appear in the main editor.
  * View tabs  
    To view any of your saved tabs, click on its name in the list, and the tab content will appear in the main editor.
  * Delete tabs  
    To delete any of your saved tabs, click on the 'x' icon next to that tab's name in the list.

* Editing Tabs  
  The center pane displays the main tab editor and fretboard input. The right sidebar displays a list of common chords for each root in the chromatic scale.
  * Setting title  
    Click on the header text ('Untitled tab', by default) above the tab editor to enable an input field to alter the title as you see fit. Click away from this input field to restore it to a header.
  * Navigating editor  
    Single characters in the tab editor can be selected by clicking on them. Multi-character selections will collapse to the single character at the start of the selection. While focused on the tab editor, the arrow keys can be used to select the adjacent character in each direction.
  * Keyboard input  
    Type a character representing a note or action (ex. '5', '/', 'x') to overwrite the current selection with that character and advance the selection one character to the right.
  * Deleting content  
    Press 'Delete' to overwrite the current selection with a dash ('-') and advance the selection one character to the left. Press 'Space' to perform the same action, but instead advancing the selection one character to the right.
  * Chord input  
    Click on a chord type (ex. 'M' for major, 'm7' for minor 7th) in the row corresponding to the desired root note to overlay that chord's fret position values onto the column containing the currently selected character (defaults to left-most column). Subsequent chord clicks will overlay every other column.
  * Fretboard input  
    Click on a fret and string position to overlay the corresponding fret value onto the corresponding 'string' in the tab editor at the column position containing the currently selected character (defaults to left-most column). Subsequent fretboard clicks will overlay a value in every other column.

## Testing
### Model and Controller testing
Before testing the Rails models and controller routes, the database in the test environment needs to be set up. Upon creating or making changes to the development database, open a terminal window in the root directory of the application and run the following command:
```
bundle exec rake db:test:prepare
```
To then run the tests, run the following command:
```
bundle exec rspec
```
After test suites have been run, a list of failing and pending tests will be displayed. Passing tests will be represented by a green dot in the first line below your command.

### Unit and Feature testing
To test the JavaScript utility functions and React components, open a terminal window in the root directory of the application and run the following command:
```
yarn test
```
After test suites have been run, a list of passing, failing, and skipped tests will be displayed.

## Credits
### Built With
* [make_it_so](https://github.com/LaunchAcademy/make_it_so) - Provided initial app configuration and support for ReactJS, Ruby on Rails, Devise, SASS, RSpec, and Jest
* [React Bootstrap](https://react-bootstrap.github.io/) - Basis for layout and button components
* [React Quill](https://github.com/zenoamaro/react-quill) - Basis for tablature editor component
* [UberChord](https://api.uberchord.com/) - Source of chord information
* [Postgres](https://www.postgresql.org/) - Database system for user and tablature data

### Author
Andrew M. Lee

### License
MIT License
