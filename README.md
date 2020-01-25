# Video upload and streaming Api

API to upload, generate thumbnail images and stream videos

### Prerequisites

- Thumbnail image is generated using fluent-ffmpeg package.
- fluent-ffmpeg requires ffmpeg >= 0.9 to work
- To install in windows 10, follow this guide - https://m.wikihow.com/Install-FFmpeg-on-Windows

### Packages

    Express js
    Node js latest
    fluent-ffmpeg : To generate thumbnail images of uploaded video
    multer : to handle multi-part data
    supertest, Jest : Testing library

### Bootstrapping server

- Install ffmpeg and set path in environment variable
- clone the project : git clone https://github.com/websure/videoupload-api.git
- cd to project root folder and execute following commands in the terminal 
    - npm install 
    - npm start
- Application will run on http://localhost:5000/

### features

- Api to fetch available videos (/api/v1/video)
- Api to upload video (/api/v1/video/upload)
- Api to fetch images and videos (/assets/videos/:id)

### Testing

- To the the application , cd to project root folder and execute the command in the terminal
  - npm test
-   Tested on windows 10 OS
### Caveats

- uploaded videos and generated thumbnails are stored in `upload` folder.
-    For demo purpose , instead of Database , video lists are stored in memory variable.

### To do

- Implement delete Api
- Unit testing to be done
- To define a DB
