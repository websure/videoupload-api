/* 
  Registering Video routes
*/
import { Router } from "express";
import * as VideoController from "./video.controllers";
import { VideoMiddleware } from "../../config/middleware";
const routes = Router();

routes.get("/", VideoController.getVideos);
routes.post(
  "/upload",
  VideoMiddleware.single("video"),
  VideoController.uploadVideo
);
export default routes;
