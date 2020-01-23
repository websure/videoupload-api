import { Router } from "express";
import * as VideoController from "./video.controllers";
import { VideoMiddleware } from "../../config/middleware";
const routes = Router();

routes.get("/", VideoController.getVideos);
// routes.delete("/:id", VideoController.fetchVideo);
routes.post(
  "/upload",
  VideoMiddleware.single("video"),
  VideoController.uploadVideo
);
//routes.put('/', IdeaController.updateIdeas)

export default routes;
