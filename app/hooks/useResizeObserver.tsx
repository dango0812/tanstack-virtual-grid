import { useEffect, useState } from "react";

/**
 * Custom hook to observe the size of an HTML element.
 * @param ref - React ref object pointing to the element to observe.
 * @returns An object containing the width and height of the element.
 */
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