# 🐤 Canary Project

A dummy project for testing out product development techniques and procedures.


## Getting Started

1. Make sure you have Node.js and Postgres (at least ver 13) installed.
1. Clone down the repo
1. `npm run start`
1. The Project should be running on `localhost:8000`


- You can create a `./config/local.config.js` file to override and change settings within the project. (Don't worry, this won't be commited to the repo)
- You can either set up your own Okta instance, or grab the configs from another team member and use a shared developer instance



## Development

Canary is set up to support rapid development.

- Starting the project with `npm run dev` sets it in development mode
- In development mode, it uses file watchers to automatically restart and re-bundle any code that changes
- It uses [Live Reload](http://livereload.com/extensions/) to automatically update the browser with changes
- Freely make changes to your own `./config/local.config.js` without affecting the rest of the project


## Tests
You can run the test cases by running `npm run tests`. If any tests fail it'll output an exit code of `1`.

The test cases cover unit tests for business logic, API tests using [`supertest`](https://www.npmjs.com/package/supertest), and database tests using isolated tables.



## Tech Stack

- *Server*: [Node.js](https://nodejs.org/en/) & [Express](https://expressjs.com/)
- *Database*: [Postgres](https://www.postgresql.org/download/)
- *Accounts/Authentication*: [Okta](https://www.okta.com/)
- *Frontend Framework*: React-like component-based
- *API Spec*: [Swagger](https://swagger.io/)
- *Analytics*: [Mixpanel](https://mixpanel.com/)
- *Payments*: [Stripe](https://stripe.com/docs/payments)


## Deployments

Currently the Canary Project has two deployment environments: `development` and `production`

#### `development`
- Set up for auto-deploys from new pushes and PRs to `master` branch on Github
- Configs should roughly mirror local development
- Used to validate deployed feature changes
- Can whitelist valid IP ranges for internal access only

#### `production`
- Deployed from a deployed `development` slug



## Compliance & Security

Heroku has [extensive documentation on how they comply with GDPR](https://devcenter.heroku.com/articles/gdpr)

We can give any team oversight access to both the Github repo and the Heroku pipelines.



### Scripts

- `npm run start` : Starts a project server
- `npm run dev` : Starts a development server
- `npm run tests` : runs the test cases
- `npm run dummy_data` : Preloads the database with some random fake data
- `npm run logs` : Outputs the log stream from the production Heroku instance
- `npm run heroku` : Opens a browser to the Heroku pipeline



