[![Codeship Status for freerangeandy/tab-loom](https://app.codeship.com/projects/b2560a10-6ee0-0138-6377-1e517a23528f/status?branch=master)](https://app.codeship.com/projects/395067)

# Tab loom
A virtual sketchbook for creating guitar tablature with clickable chord and fretboard inputs

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

Assuming PostgreSQL installed successfully, open the Postgres app and click preferences to start Postgres automatically on logging in to your local machine. Alternatively, you could manually start Postgres before using this application.

To initialize the database tables used by the application, open a terminal window and run the following command:
```
bundle exec rake db:create && bundle exec rake db:migrate
```
If those commands ran successfully, Postgres should be hosting a `tab-loom_development` database containing `tablature` and `user` tables.

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

Both servers are required to be running for the application to function. Using `Ctrl-C` in either terminal window will bring down that server and make the application inaccessible.



This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
