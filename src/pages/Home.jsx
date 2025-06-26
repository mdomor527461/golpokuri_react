import Banner from "../components/banner/Banner";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar"
import TopStories from "../components/top_stories/TopStories";

export default function Home() {
    return (
        <div>
            
            <Banner/>
            <TopStories/>
            <Footer/>
        </div>
    );
}