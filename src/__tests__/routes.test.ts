import request from "supertest";
import app from "../server";
import path from "path";
import fs from "fs";

const getVideo = () => {
  return request(app).get("/api/v1/video");
};

describe("Video Endpoints", () => {
  it("should return status code 200", async done => {
    getVideo().expect(200, done);
  });
  it("initial video list should be empty", async done => {
    getVideo()
      .expect(200)
      .expect({ result: {} }, done);
  });
  it("successfully upload a video", async done => {
    request(app)
      .post("/api/v1/video/upload")
      .attach("video", path.join(__dirname, "/1.mp4"))
      .expect(response => {
        expect(response.status).toBe(200);
        expect(response.body.result).not.toBe({});
        done();
      })
      .catch(err => console.log(err));
  });
  it("Thumbnail is created after video upload", async done => {
    request(app)
      .post("/api/v1/video/upload")
      .attach("video", path.join(__dirname, "/1.mp4"))
      .expect(response => {
        expect(response.status).toBe(200);
        expect(response.body.result).not.toBe({});
        const { id, screenshot } = response.body.result;
        expect(fs.existsSync(screenshot)).toBeTruthy();
        done();
      })
      .catch(err => console.log(err));
  });
});
