const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, ""))); // Update path

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); // Update path
});

app.get("/video", (req, res) => {
  // Your existing video streaming code remains the same
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires RAnge header");
  }

  const videoPath = "pinkvenom.mp4";
  const videoSize = fs.statSync("pinkvenom.mp4").size;
  const CHUNK_SIZE = 10 ** 6; //1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start} - ${end}/${videoSize}`,
    "Accept-Range": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);

  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});
app.get("/video/:id", (req, res) => {
  const videoId = req.params.id;
  // Your existing video streaming code remains the same
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires RAnge header");
  }

  const videoPath = `${videoId}.mp4`;
  const videoSize = fs.statSync(`${videoId}.mp4`).size;
  const CHUNK_SIZE = 10 ** 6; //1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start} - ${end}/${videoSize}`,
    "Accept-Range": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);

  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});

app.listen(8000, () => {
  console.log("Listening on port 8000!");
});
