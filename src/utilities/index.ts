import * as path from "path";
import ffmpeg from "fluent-ffmpeg";
import VideosList from "../Mock.json";
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

const VideoDB: IVideoDB = {
  testdata: VideosList
};

console.log("current dir ", path.join(__dirname, ""));
const UPLOAD_PATH = path.join(__dirname, "../../uploads/videos");
const IMAGE_PATH = path.join(__dirname, "../../uploads/images");

const videoFilter = (
  _req: any,
  file: { originalname: string },
  cb: (arg0: Error, arg1: boolean) => void
) => {
  // accept image only
  if (!file.originalname.match(/\.(mp4)$/)) {
    return cb(new Error("Only mp4 files are allowed!"), false);
  }
  cb(null, true);
};

const createThumbnail = (filename: string) => {
  console.info(`createThumbnail for : ${UPLOAD_PATH}\\${filename}`);
  return new Promise((resolve, reject) => {
    ffmpeg(`${UPLOAD_PATH}/${filename}`)
      .screenshots({
        timestamps: ["30%"],
        filename: `${filename}.png`,
        folder: IMAGE_PATH
      })
      .on("end", () => {
        console.info("thumbnail end ");
        resolve(true);
      })
      .on("error", (e: any) => {
        console.info("thumbnail error ", e);
        reject(e);
      });

    // ffmpeg()
    //   .input(`${UPLOAD_PATH}/${filename}`)
    //   .outputOptions([`-vf fps=1/24`])
    //   .output(`${IMAGE_PATH}/${filename}`)
    //   .on("end", () => {
    //     console.info("thumbnail end ");
    //     resolve(true);
    //   })
    //   .on("error", e => {
    //     console.info("thumbnail error ", e);
    //     reject(e);
    //   });
  });
};

export { VideoDB, UPLOAD_PATH, IMAGE_PATH, videoFilter, createThumbnail };
