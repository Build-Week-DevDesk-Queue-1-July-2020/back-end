**ENDPOINT:** https://bw-devdeskqueue.herokuapp.com/

##### STUDENTS

| Endpoint  | Description          | Data                                                                                |
| --------- | -------------------- | ----------------------------------------------------------------------------------- |
| /register | Register new student | name (string, REQUIRED)<br />cohort (string, REQUIRED)<br />email (string, REQUIRED | UNIQUE)<br />password (string, REQUIRED) |
| /login    | Login student        | email (string, REQUIRED)<br />password (string, REQUIRED)                           |

###### RESPONSE

```
{
    "student_id": 1,
    "message": "Welcome jane doe!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50SWQiOjEsImVtYWlsIjoiamFuZWRvZTFAbWUuY29tIiwiaWF0IjoxNTk1Mzk0NDA3fQ.xeZrCMBmGKBf7SpPhfB2CMb-F_oYit9cBl0vzf38XSk"
}
```

##### HELPERS

| Endpoint  | Description         | Data                                                      |
| --------- | ------------------- | --------------------------------------------------------- |
| /register | Register new helper | name (string, REQUIRED)<br />email (string, REQUIRED      | UNIQUE)<br />password (string, REQUIRED) |
| /login    | Login helper        | email (string, REQUIRED)<br />password (string, REQUIRED) |

###### RESPONSE

```
{
  "helper_id": 1,
  "message": "Welcome jane doe!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWxwZXJJZCI6MSwiZW1haWwiOiJqYW5lZG9lNkBtZS5jb20iLCJpYXQiOjE1OTUzOTU2NTJ9.EszcZ0-e91qtmK2XeUseDO76Xi59sqXGuWVb_nWypz8"
}
```
