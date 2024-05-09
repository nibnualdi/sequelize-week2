console.log("Wait a moment!");

const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require("./routers/router");

app.use("/", router);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
