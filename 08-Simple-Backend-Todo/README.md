# Todo

## Authentication / User Management:
  - User : {
      userId   : !ID     = REQUIRED, UNIQUE
      token    : !String = REQUIRED, UNIQUE ( generated by the backend on login, register )
      password : !String = REQUIRED
      todos    : ![Todo] = []
    }
  - /register   in:(id,password) out:(token)
  - /login      in:(id,password) out:(token)
  - /logout     in:(token)       out:()
  - /unregister in:(token)       out:()

## Todo-List:
  - Todo = {
      todoId : !ID      =          (Automatic)
      date   : !Date    = Date.now (Automatic)
      status : !Boolean = false
      text   : !String  = ''
    }
  - GET    /todo         in:(token)             out:([Todo])
  - POST   /todo         in:(token,Todo)        out:(Todo)
  - PATCH  /todo/:todoId in:(token,todoId,Todo) out:(Todo)
  - DELETE /todo/:todoId in:(token,todoId)      out:(*[Todo])