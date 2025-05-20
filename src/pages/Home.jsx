import Banner from "../components/banner/Banner";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/navbar";
import TopStories from "../components/top_stories/TopStories";

export default function Home() {
    return (
        <div>
            <Navbar/>
            <Banner/>
            <TopStories/>
            <Footer/>
        </div>
    );
}