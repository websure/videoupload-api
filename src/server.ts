import express from "express";
import cors from "cors";
import multer from "multer";
import { ExpressMiddlewareConfig, VideoStorageConfig } from "./config/middleware";
import { VideoDB, UPLOAD_PATH, IMAGE_PATH, videoFilter } from './utilities'

import apiRoutes from "./modules";

const app = express();
ExpressMiddlewareConfig(app);
app.use(cors());





// respond with "hello world" when a GET request is made to the homepage
app.get("/", function(req, res) {
  res.send("hello world");
});

apiRoutes(app);

app.listen(5000, () => console.log("Express app listening on port 5000!"));
