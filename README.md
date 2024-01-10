# beautiful-api

This is a simple API that uses Supertest for integration testing. It follows an example provided in this [blogpost](https://medium.com/@adrianpothuaud/why-you-should-think-twice-before-using-supertest-in-your-api-integration-tests-327f86010fcf)

To run:
```
npm install
npm start
```

You can run break the server by commenting the following code in server.js
```
const httpPort = process.env.PORT || 3000;
app.listen(httpPort, () => {
     console.log("Server started on port", httpPort);
 })
```
And then you can run the test suite with `npm test` to confirm that event if the server is broken, the test will pass. 

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