const express = require('express')
const app = express()
const port = 3000;
const router = require("./routes/index.js")
const errorhandler = require("./middle/errorhandler.js")
const swaggerUI = require("swagger-ui-express")
const moviesJson = require(".movies.json/")
const morgan = require("morgan")


app.use(morgan());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(moviesJson));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(router);
app.use(errorhandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})