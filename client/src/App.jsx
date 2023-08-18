// import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import "./app.scss";
import "/node_modules/video-react/dist/video-react.css";
import { Player } from "video-react";

function App() {
  return (
    <>
      <Player
        playsInline
        poster="/assets/poster.png"
        src="http://localhost:8000/video/vampire"
      />
    </>
  );
}

export default App;
