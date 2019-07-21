# server-worker
A simple Node.js app with server/worker structure, communicating through a Redis queue. The whole app is running on docker. 

How to run it:

* Download the repo. `docker-compose up --build // Make sure you have Docker installed`
* The app is available on http://localhost:3010. Can use a curl POST request like this: 
`
curl -d '{"ticket":"1"}' -H "Content-Type: application/json" -X POST http://localhost:3010/ticket
`
