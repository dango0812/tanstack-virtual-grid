"use client";

// react
import { useRef, useState } from 'react';
// styles
import styles from "@components/Layout/HorizontalResizer/HorizontalResizer.module.scss";
// components
import IconThreeDots from "@icons/IconThreeDots";

const MIN_WIDTH = 375;
const MAX_WIDTH = 1024;

interface HorizontalResizerProps {
    children: React.ReactNode;
    minWidth?: number;
    maxWidth?: number;
    height: number;
}

export default function HorizontalResizer({
    children,
    minWidth = MIN_WIDTH,
    maxWidth = MAX_WIDTH,
    height,
}: HorizontalResizerProps) {
    const parentRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef<boolean>(false);

    const [width, setWidth] = useState<number>(0);

    const handleMouseMove = (event: MouseEvent) => {
        if (!isDraggingRef.current) {
            return;
        }

        document.body.style.cursor = "ew-resize";
        setWidth((width) => width + event.movementX * 2);
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
        document.body.style.cursor = "auto";
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = () => {
        if (!parentRef.current) {
            return;
        }

        const { width } = parentRef.current.getBoundingClientRect();
        setWidth(width);

        isDraggingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    // if use useEffect, the mouse move & up handlers should always remain in memory, even if the mouse is not under control.
    // also, Even if the mouse isn't used, useEffect will still run unconditionally

    return (
        <div
            ref={parentRef}
            className={styles.wrapper}
            style={{
                width,
                height,
                minWidth,
                maxWidth
            }}
        >
            <div
                className={styles.contentBox}
            >
                {children}
            </div>

            <div
                className={styles.rightPannel}
                onMouseDown={handleMouseDown}
            >
                <IconThreeDots />
            </div>
        </div>
    );
}
