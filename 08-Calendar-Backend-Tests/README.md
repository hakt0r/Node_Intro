# Calendar Application

  Installing jest

  ```ShellScript
    npm install --save-dev jest
  ```

Seems like we just need two Databases,
Users and Events.

## Users

We'll probably need this, else we could write
a localStorage / frontend only app... this
is not what the client wants.

### Auth System

  - Register
  - Login
  - Unregister
  - Logout

### Data Model

Nothing to add we're fine because of our super smart
data-model for events :D

## Calendar

  - Upcoming Appointments
  - Reminders ?

### Database Structure

  - Events ( in general )
    - Type ( ? )
    - Title
    - Color
    - DateTime (fixed)
  - Appointment
    - Address/
    - Notes
  - Reminder
    - Priority
    - DateTime (fixed)
    - Alarm
    - Notification
  - Todo
    - Priority
    - DateTime (due date)
    - DateTime (date of todo)

Try to simplify these aspects by using one Database,
reflecting the different functionalities in terms of
Item-Type and fields specific to different sub-functions.

### Data Model: Events

  - id : UUID
  - owners : [User] value := private event | null := public event
  - participants : [User]
  - type : Enum : 'appointment'|'reminder'|'todo'
  - title : String
  - description : String (notes, links, free-text)
  - notification : String
  - color : String
  - date : Date
  - location : String
  - priority : Number | enum : 'low'|'average'|'high'
  - repeat : enum : 'daily'|'weekly'|'monthly'|'yearly'
  - alarm : Date

### Actions

For the list function it would actually make sense if we
could filter as detailed as possible,
with all the functions wee need to make sure that we
honor the owners privilege of editing and deleting.

  - List (many)
      - POST /list {Event}
      - Filter events by any field
      - Protect private events! (check owners and participants)
  - Get (one)
      - GET /:id
      - Protect private events! (check owners and participants)
  - Create
      - POST / {Event}
      - Protect private events!
  - Edit
      - PATCH /:id {Event}
      - Protect private events!
  - Delete
      - DELETE /:id
      - Protect private events!

## Tasks

  1. Get a boilerplate running
     Steal code, install modules, make it work
  2. Figure out a uuid module
  3. Create Database
  4. Create skeleton routes
  5. Write controller (simple to hard)
  6. Test it!