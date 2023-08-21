const connectToMongo = require("./db");
connectToMongo();

const express = require("express");
const app = express();
const port = 8000;

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`INoteBook Backend listening on http://localhost:${port}`);
});
