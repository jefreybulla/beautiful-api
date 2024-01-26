# supertest-demo
This repo shows how to use Supertest for API testing and how to add a sanity check to confirm that the server is live.

This Node app is an API to add notes. It follows an example provided in this [blogpost](https://medium.com/@adrianpothuaud/why-you-should-think-twice-before-using-supertest-in-your-api-integration-tests-327f86010fcf)

To run:
```
npm install
npm start
```

You can break the server by commenting out the following code in `server.js`
```
const httpPort = process.env.PORT || 3000;
app.listen(httpPort, () => {
     console.log("Server started on port", httpPort);
 })
```
Also you need to uncomment the following line in `server.js`
```
throw new Error("Fake Error")
```
After the changes are made, try running the test suite with `npm test`. Notice that all the tests will pass even when the server is failing! We can improve our project by adding a server availability check as described below. 

## Sanity check by pinging the server using GH Actions
The script in `ping.js` pings the server to confirm that the server is running. This avoid false positives when performing only integration tests with Supertest.

You can confirm this scenario by breaking the server as explained above and then pushing to Github. The CI process should fail! See it failing [here](https://github.com/jefreybulla/beautiful-api/actions/runs/7491749413/job/20393681378?pr=2)

## Create a note using Postman
- Use `http://localhost:3000/notes` in a POST request. 
- Make sure to have the following header: Content-Type: application/json
- Use a raw body such as 
```
{
    "title": "title 1",
    "content":"content 1"
}
```
