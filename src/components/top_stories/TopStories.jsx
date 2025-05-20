import StoryHeader from "./StoryHeader";
import Story from "./Story";
import story1 from "../../assets/images/story1.jpg";
import story2 from "../../assets/images/story2.jpeg";
import story3 from "../../assets/images/story3.jpeg";
import story4 from "../../assets/images/story4.jpeg";

export default function TopStories() {
  const stories = [
    {
      image: story1,
      title: "The Enchanted Forest",
      description: "A magical adventure\nIn a mysterious...",
      rating: 4,
    },
    {
      image: story2,
      title: "Mythical Dragon",
      description: "Follow the journey\nof a young child and...",
      rating: 4,
    },
    {
      image: story3,
      title: "Adventures in Space",
      description: "Join a boy on his\nexciting journey through...",
      rating: 4,
    },
    {
      image: story4,
      title: "The Hidden Castle",
      description: "A thrilling tale of a\nsecret fortress wait...",
      rating: 4,
    },
  ];

  return (
    <section className="px-4 md:px-16 py-10 bg-white">
      <StoryHeader />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6 animate-fade-in">
        {stories.map((story, index) => (
          <Story key={index} {...story} />
        ))}
      </div>
    </section>
  );
}
