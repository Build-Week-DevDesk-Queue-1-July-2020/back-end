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
**DEFAULT STUDENTS**
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

**POST /students/register**

{
  "message": "Successfully added new student"
}

**POST /students/login**

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
**DEFAULT HELPERS**
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

**POST /helpers/register**

{
  "message": "Successfully added new helper"
}

**POST /helpers/login**

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
**GET /categories**

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

**POST /categories/add**

{
  "message": "Successfully added new category."
}

**PATCH /categories/:id**

{
  "message": "Successfully updated category."
}

**DELETE /categories/:id**

{
  "message": "Successfully deleted category."
}
```
