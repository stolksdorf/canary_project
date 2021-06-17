# canary_project
A dummy project for testing out deployment platforms




### Scripts

- `npm run start` : Starts a development server
- `npm run dev` : Starts a development server
- `npm run tests`
- `npm run tests:dev`

- `npm run dummy_data` : Preloads the data base with some random fake data

- `npm run logs`
- `npm run heroku`





## Okta Config


*To access User Groups*

so I have to modify the core config of the Security>API>Authorization Server>default setting
I have to create a new scope called groups and leave it blank. Then I have to create a new claim of the exact same name, attach it only to the ID token instance (if you select all or Access, it will fail and cause errors). The config for that requires a regex group setting of .* You have to set the scopes to "any" and not groups, if you do it will also fail.

https://devforum.okta.com/t/cant-use-group-claims-to-get-the-users-group/10403