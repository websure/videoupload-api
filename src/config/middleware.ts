import bodyParser from "body-parser";
import express from "express";
import multer from "multer";
import { UPLOAD_PATH, IMAGE_PATH, videoFilter } from "../utilities";
// import compression from 'compression';
// import helmet from 'helmet';

const ExpressMiddlewareConfig = (app: express.Application) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: "50mb"
    })
  );
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
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, PUT, POST, DELETE, OPTIONS"
    );
    next();
  });
};

const VideoStorageConfig = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log("video storage ", UPLOAD_PATH);
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

export { ExpressMiddlewareConfig, VideoStorageConfig, VideoMiddleware };

// export default app:express.application => {
//   // app.use(compression());
//   // app.use(helmet());
//   app.use(
//     bodyParser.urlencoded({
//       extended: true,
//       limit: "50mb"
//     })
//   );
//   app.use(function(req:express.Request, res:express.Response, next:express.NextFunction) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET, PUT, POST, DELETE, OPTIONS"
//     );
//     next();
//   });
// };
