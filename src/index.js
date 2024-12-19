const express = require('express')
const bodyParser = require('body-parser')
require('./loadEnviorement')
const connectToDb = require("./db/database");
const weeksRouter = require('./routes/week')

const port = 3000
const app = express()

const startServer = async () => {
  try {
    app.use(bodyParser.json())
    const db = await connectToDb();
    app.use("/weeks", weeksRouter)


    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    process.exit(1);
  }
}

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

startServer()


