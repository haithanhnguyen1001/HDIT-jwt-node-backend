import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./routes/web";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

//config view engine
configViewEngine(app);

//init web route
initWebRoute(app);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
