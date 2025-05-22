import About from "./About";
import HeroSection from "./HeroSection";
import Testimonials from "./TestiMonials";
import TopProduct from "./TopProduct";

export default function Home(){
    return (
        <div>
            <HeroSection/>
            <About/>
            <TopProduct/>
            <Testimonials/>
        </div>
    );
}