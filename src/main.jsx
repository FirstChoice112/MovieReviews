import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
// import App from './App.jsx'

import StarRating from "./StarRating";

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
      <p>This movie was Rated {movieRating} stars</p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating size={24} color="red" className="test" defaultRating={3} />
    {/* <App /> */}
    <Test />
  </StrictMode>
);
