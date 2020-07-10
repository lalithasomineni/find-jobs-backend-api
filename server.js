const express = require("express");
const db = require("./config/database");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.port || 3000;

app.use(bodyParser.json());
app.use("/gigs", require("./routes/gigs"));

db.authenticate()
  .then(() => console.log(`connected`))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`am connected at port ${port}`);
});
