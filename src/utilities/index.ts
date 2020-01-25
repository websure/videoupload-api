/* 
  Common utilites functions and constatns
*/
import * as path from "path";
import ffmpeg from "fluent-ffmpeg";
import bunyan from "bunyan";

const logger = bunyan.createLogger({ name: "videoController" });

interface IDatabase {
  id: string;
  name: string;
  size: number;
  path: string;
  encoding?: string;
  mimetype: string;
  details: string;
  screenshot: string;
}
interface IVideoDB {
  [key: string]: IDatabase;
}

const VideoDB: IVideoDB = {};
const UPLOAD_PATH = path.join(__dirname, "../../uploads/videos");
const IMAGE_PATH = path.join(__dirname, "../../uploads/images");

const videoFilter = (
  _req: any,
  file: { originalname: string },
  cb: (arg0: Error, arg1: boolean) => void
) => {
  logger.info("validate type of uploaded video file");
  if (!file.originalname.match(/\.(mp4)$/)) {
    return cb(new Error("Only mp4 files are allowed!"), false);
  }
  cb(null, true);
};
const createThumbnail = (filename: string) => {
  return new Promise((resolve, reject) => {
    /* create thumbnail from uploaded video and store at IMAGE_PATH */
    ffmpeg(`${UPLOAD_PATH}/${filename}`)
      .screenshots({
        timestamps: ["30%"],
        filename: `${filename}.png`,
        folder: IMAGE_PATH,
        size: "320x240"
      })
      .on("end", () => {
        logger.info(
          "Thumbnail of video file created successfully at : ",
          `${UPLOAD_PATH}/${filename}`
        );
        resolve(true);
      })
      .on("error", (e: any) => {
        logger.error("error in Thumbnail creation : ", e);
        reject(e);
      });
  });
};

export { VideoDB, UPLOAD_PATH, IMAGE_PATH, videoFilter, createThumbnail };
