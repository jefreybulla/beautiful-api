const axios = require("axios");

const httpPort = process.env.PORT || 3000

axios
    .get(`http://localhost:${httpPort}`)
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        if (err.response)
            console.log(err.response.status + "code received");
        else
            console.log("No response from server");
        process.exit(1)
    })