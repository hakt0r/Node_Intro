
# The Backend
  - runs on a server (nodejs, php, python, ...)
  - invisible for the user
  - authentication (authorative)
  - usually: request-based interaction with the frontend
    - REST/CRUD HTTP-Derived Interface
      - Sever can just respond
    - More modern: Direct interface (WebSockets)
      - Server can send events
  - deals with logic of the app (application controller)
  - stores an retrieves data (database-aspect, sql, nosql)
  - can be distributed
    - multiple instances of one service (distribution)
      - syncronized instances
      - same code and same purpose
    - specialized sub-services running in parallel
      - not the same code, different purpose
      - somtimes still need to syncronize

## Classic backend
  - Express:  (REST Interface and Application Layer)
  - Mongoose: (MongoDB, Database Layer)
  - Authentication: (JWT, Passport)
    - Easy to implement
    - External authentication
    - Verify indenity

## Supermodern Structre
  - GraphQL
  - TypeScript