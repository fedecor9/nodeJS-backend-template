const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compress = require("compression");

//import routes
import userRoutes from "./routes/user.routes";

//express app
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(cookieParser());
app.use(helmet());
app.use(compress());

//routes
app.use("/", userRoutes);

export default app;
