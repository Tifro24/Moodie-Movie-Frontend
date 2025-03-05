import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Home() {
  const navigate = useNavigate();
  const moods = ["Happy", "Sad", "Adventurous", "Studious", "Funny", "Excited", "Scary"];

  return (
    <div className="Homepage">
      <Header />
      <div className="hpButtons">
        {moods.map((mood) => (
            <button key={mood} onClick={() => navigate(`/genres?mood=${mood.toLowerCase()}`)}>
            {mood}
            </button>
         ))}
      </div>
    </div>
  );
}

export default Home;