# Endpoints #
----

## Authentication ##

These routes have common validation for email and password fields with a few exceptions. Exceptions will be provided at its route section.

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
