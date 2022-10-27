const express = require("express");
const cors = require("cors")
const gachaponRoute = require('./route/gachapon')
const userRoute = require('./route/user')
const bodyParser = require('body-parser')

const app = express();
const PORT = 8081

app.use(cors({origin: "http://localhost:8080"}))

app.use(express.json());
app.use(bodyParser.json())

app.use('/gachapon', gachaponRoute);
app.use('/user', userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});