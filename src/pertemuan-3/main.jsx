import { createRoot } from "react-dom/client";
import TailwindCSS from "./TailwindCSS";
import UserForm from "./UserForm";
import './tailwind.css';
import HitungGajiForm from "./HitungGajiForm";
import Learnify from "./learnify";

createRoot(document.getElementById("root"))
    .render(
        <div>
            <TailwindCSS/>
            <UserForm/>
            <HitungGajiForm/>
            <Learnify/>
        </div>
    )