**ENDPOINT:** https://bw-devdeskqueue.herokuapp.com

database: Sqlite3<br />
authe: JSON web tokens

##### STUDENTS

| Endpoint                | Description          | Data                                                                                                                         |
| ----------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| POST /students/register | Register new student | name (string, REQUIRED)<br />cohort (string, REQUIRED)<br />email (string, REQUIRED,UNIQUE)<br />password (string, REQUIRED) |
| POST /students/login    | Login student        | email (string, REQUIRED)<br />password (string, REQUIRED)                                                                    |

###### SUCCESS RESPONSES

```
*** DEFAULT STUDENTS ***
{
    name: "janedoe",
    cohort: "pt-14",
    email: "janedoe@me.com",
    password: abc12345,
},
{
    name: "johndoe",
    cohort: "pt-14",
    email: "johndoe@me.com",
    password: abc12345,
},

*** POST /students/register ***

{
  "message": "Successfully added new student"
}

*** POST /students/login ***

{
    "student_id": 1,
    "message": "Welcome jane doe!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50SWQiOjEsImVtYWlsIjoiamFuZWRvZTFAbWUuY29tIiwiaWF0IjoxNTk1Mzk0NDA3fQ.xeZrCMBmGKBf7SpPhfB2CMb-F_oYit9cBl0vzf38XSk"
}
```

##### HELPERS

| Endpoint               | Description         | Data                                                                                          |
| ---------------------- | ------------------- | --------------------------------------------------------------------------------------------- |
| POST /helpers/register | Register new helper | name (string, REQUIRED)<br />email (string, REQUIRED,UNIQUE)<br />password (string, REQUIRED) |
| POST /helpers/login    | Login helper        | email (string, REQUIRED)<br />password (string, REQUIRED)                                     |

###### SUCCESS RESPONSES

```
*** DEFAULT HELPERS ***
{
    name: "helper1",
    email: "helper1@me.com",
    password: abc12345,
},
{
    name: "helper2",
    email: "helper2@me.com",
    password: abc12345,
},

*** POST /helpers/register ***

{
  "message": "Successfully added new helper"
}

*** POST /helpers/login ***

{
  "helper_id": 1,
  "message": "Welcome jane doe!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWxwZXJJZCI6MSwiZW1haWwiOiJqYW5lZG9lNkBtZS5jb20iLCJpYXQiOjE1OTUzOTU2NTJ9.EszcZ0-e91qtmK2XeUseDO76Xi59sqXGuWVb_nWypz8"
}
```

##### CATEGORIES (restricted route)

| Endpoint               | Description         | Data                    |
| ---------------------- | ------------------- | ----------------------- |
| GET /categories/       | Get all categories  |                         |
| POST /categories/add   | Register new helper | name (string, REQUIRED) |
| PATCH /categories/:id  | Update category     | name (string, REQUIRED) |
| DELETE /categories/:id | Delete category     |                         |

###### SUCCESS RESPONSES

```
*** GET /categories ***

{
    "id": 1,
    "name": "React"
},
{
    "id": 2,
    "name": "Express"
},
{
    "id": 3,
    "name": "Nodejs"
}

*** POST /categories/add ***

{
  "message": "Successfully added new category."
}

**PATCH /categories/:id**

{
  "message": "Successfully updated category."
}

*** DELETE /categories/:id ***

{
  "message": "Successfully deleted category."
}
```

##### TICKETS (restricted route)

| Endpoint                                     | Description                                    | Data                                                                                                                             |
| -------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| GET /student/:id/tickets/                    | Get open tickets by student id                 |                                                                                                                                  |
| GET /student/:id/tickets/:ticketId           | Get open tickets by student id and ticket id   |                                                                                                                                  |
| GET /student/:id/tickets/category/categoryId | Get open tickets by student id and category id |                                                                                                                                  |
| POST /student/:id/tickets/                   | Post new ticket by student id                  | title (string, REQUIRED)<br/>description (string, REQUIRED)<br/>what_ive_tried (string, REQUIRED)<br/>category_id (integer)<br/> |
| PUT /student/:id/tickets/:ticketId           | Update ticket by id                            | title (string, REQUIRED)<br/>description (string, REQUIRED)<br/>what_ive_tried (string, REQUIRED)<br/>category_id (integer)<br/> |
| DELETE /student/:id/tickets/:ticketId        | Delete ticket by id                            |                                                                                                                                  |

###### SUCCESS RESPONSES

```
*** GET /student/:id/tickets/ ***

{
    "id": 1,
    "title": "Image test",
    "description": "cannot resize test",
    "what_ive_tried": "lorem ipsum test",
    "category_name": "Uncategorized",
    "status": "open",
    "helper_name": "helper1"
},
{
    "id": 2,
    "title": "React styled components",
    "description": "not styling divs",
    "what_ive_tried": "inline styles",
    "category_name": "React",
    "status": "open",
    "helper_name": "helper1"
}

*** GET /student/:id/tickets/:ticketId ***

{
    "id": 2,
    "title": "React styled components",
    "description": "not styling divs",
    "what_ive_tried": "inline styles",
    "category_name": "React",
    "status": "open",
    "name": "helper1"
}

*** GET /student/:id/tickets/category/:categoryId ***

{
    "id": 3,
    "title": "React routes",
    "description": "keep getting 500",
    "what_ive_tried": "install packages, rename routes",
    "category_name": "React",
    "status": "open",
    "helper_name": "helper1"
}

*** POST /student/:id/tickets/  ***

{
  "message": "Successfully added new ticket."
}

*** PUT /student/:id/tickets/:ticketId  ***

{
  "message": "Successfully updated ticket."
}

*** DELETE /student/:id/tickets/:ticketId  ***

{
  "message": "Successfully deleted category."
}
```
