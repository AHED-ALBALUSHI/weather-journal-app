// Setting up an empty JS object to act as an endpoint for all routes
let projectData = {};

// Requiring Express to run the server and routes
const express = require("express");

// Starting up an instance of the app
const app = express();

// Middleware setup
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross-origin allowance
const cors = require("cors");
app.use(cors());

// Initializing the main project folder
app.use(express.static('website'));

// Define a route handler for GET '/all'
const getAllData = (req, res) => res.status(200).send(projectData);
app.get("/all", getAllData);

// Define a route handler for POST '/add'
const addData = (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
}

app.post("/add", addData);

// Setup Server
const port = 4848;
const hostname = "127.0.0.1";

// Testing the server 
const listening = () => console.log(`Server running at http://${hostname}:${port}/`);
app.listen(port, listening);
