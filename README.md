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
***DEFAULT STUDENTS***
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

***POST /students/register***

{
  "message": "Successfully added new student"
}

***POST /students/login***

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
***DEFAULT HELPERS***
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

***POST /helpers/register***

{
  "message": "Successfully added new helper"
}

***POST /helpers/login***

{
  "helper_id": 1,
  "message": "Welcome jane doe!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWxwZXJJZCI6MSwiZW1haWwiOiJqYW5lZG9lNkBtZS5jb20iLCJpYXQiOjE1OTUzOTU2NTJ9.EszcZ0-e91qtmK2XeUseDO76Xi59sqXGuWVb_nWypz8"
}
```

##### STUDENT TICKETS (restricted route)

| Endpoint                               | Description                    | Data                                                                                                                                   |
| -------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| GET /students/:id/tickets/             | Get open tickets by student id |                                                                                                                                        |
| POST /students/:id/tickets/            | Post new ticket by student id  | title (string, REQUIRED)<br/>description (string, REQUIRED)<br/>what_ive_tried (string, REQUIRED)<br/>category (string, REQUIRED)<br/> |
| PUT /students/:id/tickets/:ticketId    | Update ticket by id            | title (string, REQUIRED)<br/>description (string, REQUIRED)<br/>what_ive_tried (string, REQUIRED)<br/>category (integer)<br/>          |
| DELETE /students/:id/tickets/:ticketId | Delete ticket by id            |                                                                                                                                        |

###### SUCCESS RESPONSES

```
***GET /students/:id/tickets/***

{
    "id": 1,
    "title": "Image test",
    "description": "cannot resize test",
    "what_ive_tried": "lorem ipsum test",
    "category": "React",
    "status": "open",
    "helper_name": "helper1"
},
{
    "id": 2,
    "title": "React styled components",
    "description": "not styling divs",
    "what_ive_tried": "inline styles",
    "category": "React",
    "status": "open",
    "helper_name": "helper1"
}

***POST /students/:id/tickets/***

{
  "message": "Successfully added new ticket."
}

***PUT /students/:id/tickets/:ticketId***

{
  "message": "Successfully updated ticket."
}

***DELETE /students/:id/tickets/:ticketId***

{
  "message": "Successfully deleted category."
}
```

##### HELPER TICKETS (restricted route)

| Endpoint                                   | Description                  | Data                                                               |
| ------------------------------------------ | ---------------------------- | ------------------------------------------------------------------ |
| GET /helpers/tickets/                      | Get open tickets             |                                                                    |
| GET /helpers/tickets/:ticketId             | Get open tickets by id       |                                                                    |
| GET /helpers/tickets/category/:category    | Get open tickets by category |                                                                    |
| GET /helpers/tickets/category/:status      | Get open tickets by status   | <i>Params: status values</i><br/>open<br/>inprogress<br/>completed |
| PUT /helpers/:id/tickets/:ticketId/:status | Update ticket by status      | <i>Params: status values</i><br/>open<br/>inprogress<br/>completed |

###### SUCCESS RESPONSES

```
***GET /helpers/tickets/***

{
    "id": 2,
    "title": "React styled components",
    "description": "not styling divs",
    "what_ive_tried": "inline styles",
    "category": "React",
    "by_student": "janedoe",
    "helper_name": "not assigned",
    "status": "open"
},
{
    "id": 3,
    "title": "React routes",
    "description": "keep getting 500",
    "what_ive_tried": "install packages, rename routes",
    "category": "React",
    "by_student": "johndoe",
    "helper_name": "not assigned",
    "status": "open"
}

***GET /helpers/tickets/:ticketId ***

{
    "id": 2,
    "title": "React styled components",
    "description": "not styling divs",
    "what_ive_tried": "inline styles",
    "category": "React",
    "by_student": "janedoe",
    "helper_name": "not assigned",
    "status": "open"
}

***GET /helpers/tickets/category/:category***

sample url: http://localhost:5000/helpers/tickets/category/react

{
    "id": 2,
    "title": "React styled components",
    "description": "not styling divs",
    "what_ive_tried": "inline styles",
    "category": "React",
    "by_student": "janedoe",
    "helper_name": "not assigned",
    "status": "open"
},
{
    "id": 3,
    "title": "React routes",
    "description": "keep getting 500",
    "what_ive_tried": "install packages, rename routes",
    "category": "React",
    "by_student": "johndoe",
    "helper_name": "not assigned",
    "status": "open"
}

***GET /helpers/tickets/category/:status***

sample url: http://localhost:5000/helpers/tickets/status/open

{
    "id": 2,
    "title": "React styled components",
    "description": "not styling divs",
    "what_ive_tried": "inline styles",
    "category": "React",
    "by_student": "janedoe",
    "helper_name": "not assigned",
    "status": "open"
},
{
    "id": 3,
    "title": "React routes",
    "description": "keep getting 500",
    "what_ive_tried": "install packages, rename routes",
    "category": "React",
    "by_student": "johndoe",
    "helper_name": "not assigned",
    "status": "open"
}

***PUT /helpers/:id/tickets/:ticketId/:status***

sample url: http://localhost:5000/helpers/1/tickets/1/inprogress

{
  "message": "Successfully updated ticket."
}
```
