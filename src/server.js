//configuration
import config from "../config/config";
import app from "./express";
import mongoose from "mongoose";

//mongoose configuration
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
});

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

//Server
app.get("/", (req, res) => {
  res.send("test");
});

app.listen(config.port, (err) => {
  if (err) console.log(err);
  console.log(`Server running on port ${config.port}`);
});
