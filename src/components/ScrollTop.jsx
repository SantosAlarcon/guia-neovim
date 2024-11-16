import UpArrow from "./UpArrow";
import "./ScrollTop.css";
import { useEffect, useState } from "preact/hooks";

const ScrollTop = () => {
    const [estaMontado, setEstaMontado] = useState(false);
    const [oculto, setOculto] = useState(true);

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const handleScroll = () => {
            const top = document.querySelector("#scroll-top");
            if (window.scrollY < 350) {
                setOculto(true);
            } else {
                setOculto(false);
            }
        };

        window.addEventListener("load", handleScroll);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        setEstaMontado(true);
    }, [estaMontado]);

    return (
        estaMontado && (
            <div onClick={scrollToTop} id="scroll-top" className={`${!oculto ? "show" : ""}`}>
                <UpArrow />
            </div>
        )
    );
};

export default ScrollTop;
