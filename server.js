const app = require("./app");

console.log("Server starting...");

///*
const httpPort = process.env.PORT || 3000;
app.listen(httpPort, () => {
     console.log("Server started on port", httpPort);
 })
 //*/

// Uncomment the following line to throw an error in the server
//throw new Error("Fake Error")