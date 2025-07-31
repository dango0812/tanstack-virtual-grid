// react
import { useEffect, useState } from "react";

export default function useResizeObserver<T extends HTMLElement>(
    ref: React.RefObject<T | null>
) {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!ref.current) return;

        const observer = new ResizeObserver(([entry]) => {
            setSize({
                width: entry.contentRect.width,
                height: entry.contentRect.height,
            });
        });

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref]);

    return size;
}