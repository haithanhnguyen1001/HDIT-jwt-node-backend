import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoute from "./routes/web";
import initApiRoute from "./routes/api";
import bodyParser from "body-parser";
import connection from "./config/connectDB";
import configCors from "./config/cors";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

//config CORS
configCors(app);

//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection
connection();

//init web route
initWebRoute(app);
initApiRoute(app);
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
