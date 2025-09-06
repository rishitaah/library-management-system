# library-management-system
    Committed by Rishita
    This is a Library Management API Backend for the management of users and the books

# Routes and the Endpoints


## /users
GET: Get all the list of users in the system
POST: Create/register a new user

## /users/{id}
GET: Get a user by their ID
PUT: Updating a user by their ID
DELETE: Deleting a user by their ID (Check if the user still has an Issued book) && (Is there any fine/penalty to be collected)

## /users/subscription-details/{id}
GET: Get a user subscription details by their Id 
    >>Date of subscription
    >>Valid till?
    >>Fine if any?

## /books
GET: Get all then books in the system
POST: Add a new book to the system

## /books{id}
GET: Get a book by its ID
PUT: Update a book by its ID
DELETE: Delete a book by its ID

## /books/issued
GET: Get all the issued books

## /books/issued/withfine
GET:Get all issued books with their fine amount

## Subscription Types
    >>Basic(3 months)
    >>Standard (6 months)
    >>Premium (12 Months)

>>If a user missed the renewal date,then user should be collected with $100
>>If a user misses his subscription, then user is expected to pay $100
>>If a user misses both subscription & renewal then the collected amount should be $200.

## Commands
npm init
npm i express
npm i nodemon --save-dev

npm run dev

To restore node modules and package-lock.json --> npm i/npm install


git add .
git status
git commit -m "Initial Set Up"
git push

git checkout "Inital Set Up"
git checkout -b "Inital Set Up"
git status