import express from "express";
import { VideoDB, createThumbnail, IMAGE_PATH } from "../../utilities";

const getVideos = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    res.status(200).json({
      result: VideoDB || {}
    });
    return next();
  } catch (e) {
    console.log("error in fetching Videos list  ", e);
    return res.status(500).json(e);
  }
};

const fetchVideo = () => {};

const uploadVideo = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let file = req.file;
    console.info("video loaded ", file);

    createThumbnail(file.filename).then(_success => {
      const savedVideoDetails = {
        id: file.filename,
        name: file.originalname,
        size: file.size,
        path: file.path,
        encoding: file.encoding,
        mimetype: file.mimetype,
        details: req.body.details ? req.body.details : "",
        screenshot: `${IMAGE_PATH}\\${file.filename}.png`
      };
      VideoDB[file.filename] = savedVideoDetails;
      res.send(savedVideoDetails);
    });
    //return next();
  } catch (err) {
    console.log("error in uploading ", err);
    res.status(500).json(err);
  }
};

export { uploadVideo, fetchVideo, getVideos };
