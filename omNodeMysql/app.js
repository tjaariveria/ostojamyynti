const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Home page</h1>")
});

app.listen(3030, () => {
    console.log("Server started on port 3030")
});
