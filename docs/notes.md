# Notes

Some random notes about the project.


## Okta Config


*To access User Groups*

so I have to modify the core config of the Security>API>Authorization Server>default setting
I have to create a new scope called groups and leave it blank. Then I have to create a new claim of the exact same name, attach it only to the ID token instance (if you select all or Access, it will fail and cause errors). The config for that requires a regex group setting of .* You have to set the scopes to "any" and not groups, if you do it will also fail.

https://devforum.okta.com/t/cant-use-group-claims-to-get-the-users-group/10403