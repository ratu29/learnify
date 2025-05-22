import { createRoot } from "react-dom/client";
import ArtikelDetail from "./ArtikelDetail";
import Container from "./Container";
import QnASection from "./QnASection";
import ListProduct from "./ListProduct";
import './custom.css';


createRoot(document.getElementById("root"))
    .render(
        <div>
            <Container>
            <ArtikelDetail/>
            <QnASection/> 
            <ListProduct/>
            </Container>
            
        </div>
    )

