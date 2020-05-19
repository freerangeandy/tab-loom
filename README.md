[![Codeship Status for freerangeandy/tab-loom](https://app.codeship.com/projects/b2560a10-6ee0-0138-6377-1e517a23528f/status?branch=master)](https://app.codeship.com/projects/395067)

# Tab loom
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
To host an instance of this application on a local server, open a terminal window and run the following command to start the Node server:
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
Open a browser window and navigate to `http://localhost:3000/` to view the Tab Loom entry page. Functionality is disabled for a user until they have created an account and signed in.
* Sign-up/sign-in
* Tab index
  * Create new tabs
  * View tabs
  * Delete tabs
* Editing tabs
  * Setting title
  * Keyboard input
  * Chord input
  * Fretboard input
* Saving tabs

### Built With
* [make_it_so](https://github.com/LaunchAcademy/make_it_so) - Provided initial app configuration and support for ReactJS, Ruby on Rails, Devise, SASS, RSpec, and Enzyme
* [React Bootstrap](https://react-bootstrap.github.io/) - Basis for layout and button components
* [React Quill](https://github.com/zenoamaro/react-quill) - Basis for tablature editor component
* [UberChord](https://api.uberchord.com/) - Source of chord information
* [Postgres](https://www.postgresql.org/) - Database system

### Author
Andrew M. Lee

### License
Tab Loom is open source software [license placeholder]
