# Description

This is a simple Todo Task Application built using fullstack frontend using ReactJS and Backend on NodeJS.

# Replicate in Developer's Environment

## Prerequisites
- Nodejs LTS is installed.
- Postman is installed.
- git to be installed.

## Local Setup
- clone the github repository `git clone <github repo>`
- Bootup the backend by running the below commands in the command prompt.  
    `
    - navigate to backend folder via command prompt `cd backend`
    - Run the command `npm i`
    - Run the command `node server.js`
    - Backend will be available at base endpoint http://localhost:4000/
    `

- Bootup the frontend by running the below commands in the command prompt.

    - navigate to the frontend folder `cd frontend`
    - run the command `npm i` to install all the required packages.
    - run the command to `npm run dev` to bootup the frontend application.
    - Frontend will be availabe at endpoint http://localhost:5173/


## Testing Frontend using Cypres
TBD

## Testing Backend using Postman

Postman collection is available under tests/ directory.

To run the postman tests, follow the below steps

- Install newman `npm i -g newman`
- Navigate to tests/postman folder
- run the command `newman run Backend.postman_collection.json`




