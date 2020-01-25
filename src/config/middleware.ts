/* 
  Initialize express server middleware 
  Route for accessing static uploaded files
*/
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import multer from "multer";
import { UPLOAD_PATH, IMAGE_PATH, videoFilter } from "../utilities";

const ExpressMiddlewareConfig = (app: express.Application) => {
  app.use(
    bodyParser.urlencoded({
      extended: false,
      limit: "50mb"
    })
  );

  app.use(cors());
  /* Route for accessing static uploaded files */
  app.use("/assets", express.static("uploads"));
  app.use(function(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET,POST");
    next();
  });
};

const VideoStorageConfig = multer.diskStorage({
  // define video destination and filename using Multer
  destination: function(req, file, cb) {
    cb(null, UPLOAD_PATH);
  },
  filename: function(req, file, cb) {
    console.log("file name ", file.fieldname);
    cb(null, file.fieldname + "-" + Date.now());
  }
});

// multer configuration
const VideoMiddleware = multer({
  storage: VideoStorageConfig,
  fileFilter: videoFilter
});

export { ExpressMiddlewareConfig, VideoMiddleware };
