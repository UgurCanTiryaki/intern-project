# Authentication Requirements #

Most of endpoints requires user to be logged in.  
To access the endpoints:
* Register from the path `/auth/register`
* Login from the path `/auth/login` which gives you access token via response body.
* Take the string value corresponding to accessToken property.
* In the header of endpoint which requires user to be logged in, write `Authorization` as key and Bearer accessToken as value.

**Example:**
  
```json
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIzLCJpYXQiOjE2MjQ5Nzg5MjcsImV4cCI6MTYyNzU3MDkyN30.5yaLk0oZ42rIBFSWr5YO1uMJrQiG5inXm9eG0Y1aba8",
  }
```
The long string which starts with 'eyJh' is our token.

In the header:  
```
Key: Authorization
Value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIzLCJpYXQiOjE2MjQ5Nzg5MjcsImV4cCI6MTYyNzU3MDkyN30.5yaLk0oZ42rIBFSWr5YO1uMJrQiG5inXm9eG0Y1aba8
```

# Endpoints #
----

In this application all of the routes have common validation for email and password fields with a few exceptions. Exceptions will be provided at its route section.

* **email:**

  * email is required.
  * email must be a string.
  * email is not valid. (email should be in this format abc@abc.com)

* **password:**

  * password is required.
  * password must be a string.
  * password must be minimum 8 characters long.
  * password must be maximum 20 characters long.
  * password must not contain any space character.

Above validations also are used as error message for corresponding error in the msg property.

**Error Response for Above Validations:**

  * **Code:** 422 Unprocessable Entity
  * **Content:** Returns an errors array which is a list of possible error objects.
    ```json
     {
         "errors": [
             {
                 "value": "field value",
                 "msg": "error message",
                 "param": "email",
                 "location": "body"
             },
             {
                 "value": "field value",
                 "msg": "error message",
                 "param": "password",
                 "location": "body"
             },
             {
                 "value": "field value",
                 "msg": "error message",
                 "param": "password",
                 "location": "body"
             }    
         ]
     }
    ```    

**422 Error Response Body Example:**

  ```json
  {
      "errors": [
          {
              "value": "aaaa.com",
              "msg": "email is not valid.",
              "param": "email",
              "location": "body"
           },
           {
              "value": "aa aa",
              "msg": "password must be minimum 8 characters long.",
              "param": "password",
              "location": "body"
           },
           {
              "value": "aa aa",
              "msg": "password must not contain any space character.",
              "param": "password",
              "location": "body"
           }
       ]
     }
  ```
---
 
## Authentication ##
### Register ###  

  Registers single user.

* **URL**

  /auth/register

* **Method:**

  `POST`

* **Content-Type:**

  `application/json`

* **Request Body:**

  **required:**
    
    * email
    * password

* **Success Response:**

  * **Code:** 200
  * **Content:** `{ id : user's id [integer]" }`
 
* **Error Response:**

  * **When:** If email exists
  * **Code:** 409 Conflict 

### Login ###

Creates authentication and refresh jwt tokens for the given user.

* **URL**

  /auth/login

* **Method:**

  `POST`

* **Content-Type:**

  `application/json`

* **Request Body:**

  **required:**
     
    * email
    * password

* **Success Response:**

  * **Code:** 200
  * **Content:** `{ accessToken, refreshToken }`
 
* **Error Response:**

  * **When:** If email or password is wrong or tokens are not created somehow.
  * **Code:** 401 Conflict

## User ##

### Change Password  (requires user to be logged in) ###

 Changes the password of current user.

* **URL**

  /user/change-password

* **Method:**

  `PUT`

* **Content-Type:**

  `application/json`

* **Request Body:**

  **required:**
     
    * oldPassword
    * newPassword

    These two fields' validation is same as password validation above.

* **Success Response:**

  * **Code:** 204

* **Error Response:**

  * **When:** If user's current password and oldPassword doesn't match.
  * **Code:** 403 Conflict

## Ticket ##

### Send Ticket (requires user to be logged in) ###

 Create a single ticket belonging to current user.

* **URL**

  /ticket/send-ticket

* **Method:**

  `POST`

* **Content-Type:**

  `application/json`

* **Request Body:**

  **required:**
     
    * ticket
    * message

    These two fields' validations are:

    * **ticket:**

      * title is required.
      * title must be a string.
      * title must be minimum 5 characters long.
      * title must be maximum 150 characters long.

    * **message:**

      * message is required.
      * message must be a string.
      * message must be minimum 15 characters long.
      * message must be maximum 1000 characters long.

* **Success Response:**

  * **Code:** 204

* **Error Response:**

  * **When:** If any of field validations above fail.
  * **Code:** 422 Unprocessable Entity
  * **Content:** `{ errors: [error objects] }`

### List User Tickets (requires user to be logged in) ###

 Create a single ticket belonging to current user.

* **URL**

  /ticket/list-user-tickets

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200
  * **Content:** `[ ticket objects ]`
