import StoryHeader from "./StoryHeader";
import Story from "./Story";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/config";
import Preloader from "../preloader/Preloader";

export default function TopStories() {
  const [topStories, setTopStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get(`${config.apiUrl}/story/top_stories/`)
      .then((response) => {
        if (response.status == 200) {
          setTopStories(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <section className="px-4 md:px-16 py-10 bg-white">
          <StoryHeader />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6 animate-fade-in">
            {topStories.map((story, index) => (
              <Story key={index} {...story} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
