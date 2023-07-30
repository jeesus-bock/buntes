# buntes - bun, hono and kysely testing

## Installing

- Install bun https://bun.sh/docs/installation . I postally use the canary version but shouldn't be a dealbreaker.
- Install deps `bun install`
- Install Postgresql https://www.postgresql.org/download/ Create some user/password and remember those.
- Copy the example conf `cp .env.exampe .env` and edit the username/password there.
- Create database buntes on the postgres. I recommend https://dbeaver.io/download/ as an GUI tool to mess with the db.
- Run the migration `bun run migrate` This creates tables and installs some mock data into your database.
- Run the app `bun run start`

### Front-end
- `cd buntesfe` the fe is in the subdirectory
- Run `yarn` to get the deps.
- Run `yarn build` this generates the static frontend to `../public` which is the buntes Hono http-servers static file serving directory.