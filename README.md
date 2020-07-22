**ENDPOINT:** https://bw-devdeskqueue.herokuapp.com

database: Sqlite3<br />
authe: JSON web tokens

##### STUDENTS

| Endpoint           | Description          | Data                                                                                                                         |
| ------------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| /students/register | Register new student | name (string, REQUIRED)<br />cohort (string, REQUIRED)<br />email (string, REQUIRED,UNIQUE)<br />password (string, REQUIRED) |
| /students/login    | Login student        | email (string, REQUIRED)<br />password (string, REQUIRED)                                                                    |

###### SUCCESS RESPONSES

```
/students/register

{
  "message": "Successfully added new student"
}

/students/login

{
    "student_id": 1,
    "message": "Welcome jane doe!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50SWQiOjEsImVtYWlsIjoiamFuZWRvZTFAbWUuY29tIiwiaWF0IjoxNTk1Mzk0NDA3fQ.xeZrCMBmGKBf7SpPhfB2CMb-F_oYit9cBl0vzf38XSk"
}
```

##### HELPERS

| Endpoint          | Description         | Data                                                                                          |
| ----------------- | ------------------- | --------------------------------------------------------------------------------------------- |
| /helpers/register | Register new helper | name (string, REQUIRED)<br />email (string, REQUIRED,UNIQUE)<br />password (string, REQUIRED) |
| /helpers/login    | Login helper        | email (string, REQUIRED)<br />password (string, REQUIRED)                                     |

###### SUCCESS RESPONSES

```
/helpers/register

{
  "message": "Successfully added new helper"
}

/helpers/login

{
  "helper_id": 1,
  "message": "Welcome jane doe!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWxwZXJJZCI6MSwiZW1haWwiOiJqYW5lZG9lNkBtZS5jb20iLCJpYXQiOjE1OTUzOTU2NTJ9.EszcZ0-e91qtmK2XeUseDO76Xi59sqXGuWVb_nWypz8"
}
```
