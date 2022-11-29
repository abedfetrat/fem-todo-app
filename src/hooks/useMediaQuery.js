import { useEffect, useState } from "react";

function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mm = window.matchMedia(query);
        const ls = mm.addEventListener('change', (e) => setMatches(e.matches));
        setMatches(mm.matches);
        return () => {
            mm.removeEventListener('change', ls);
        };
    }, [query]);

    return matches;
}

export default useMediaQuery;