import { useEffect } from "react";

import { useLocation } from "react-router";

const ScrollToTop = () => {
    const pathName = useLocation();
    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [pathName]);
    return null;
};

export default ScrollToTop;
