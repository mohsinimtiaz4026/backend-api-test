require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

// db connection
require("./config");

// cross-platform compatibility
app.use(cors());

// middleware
app.use(express.json());

// routes
app.use('/api/v1',require('./routers'));

const PORT = process.env.PORT || 8080;

app.listen(PORT,() => console.log(`Server is listening on ${PORT}`));