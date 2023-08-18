import React from "react";
import "./VideoPlayer.scss";

function VideoPlayer() {
  return (
    <div>
      <video id="videoPlayer" width="650" controls muted autoPlay>
        <source src="http://localhost:8000/video" type="video/mp4" />
      </video>
    </div>
  );
}

export default VideoPlayer;
