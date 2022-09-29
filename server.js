const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const port = process.env.PORT

// CORS Policy
app.use(cors())

// Database Connection
require("./config/connection.js")

// JSON
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Load Routes
require("../src/router/router.js")(app)
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})