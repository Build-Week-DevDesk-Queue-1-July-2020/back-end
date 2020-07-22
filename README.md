**URL ENDPOINT:** https://bw-devdeskqueue.herokuapp.com/api/

##### Students

| Endpoint  | Description          | Data                                                                  |
| --------- | -------------------- | --------------------------------------------------------------------- |
| /register | Register new student | name(string,REQUIRED), cohort(string,REQUIRED), email(string,REQUIRED | UNIQUE), password(string, REQUIRED), |
| /login    | Login student        | email(string, REQUIRED), password (string, REQUIRED)                  |

```
###### RESPONSE
{
    "student_id": 1,
    "message": "Welcome jane doe!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50SWQiOjEsImVtYWlsIjoiamFuZWRvZTFAbWUuY29tIiwiaWF0IjoxNTk1Mzk0NDA3fQ.xeZrCMBmGKBf7SpPhfB2CMb-F_oYit9cBl0vzf38XSk"
}
```
