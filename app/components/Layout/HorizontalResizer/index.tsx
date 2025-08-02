"use client";

// react
import { useRef, useState } from 'react';
// styles
import styles from "@components/Layout/HorizontalResizer/HorizontalResizer.module.scss";
// components
import IconThreeDots from "@icons/IconThreeDots";

interface HorizontalResizerProps {
    children: React.ReactNode;
    height: number;
}

type PointerDelta = {
    movementX: number;
    movementY: number;
}

export default function HorizontalResizer({
    children,
    height,
}: HorizontalResizerProps) {
    const parentRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef<boolean>(false);

    const [width, setWidth] = useState<number>(375);

    const getPointerDelta = (() => {
        let lastX: number | null = null;
        let lastY: number | null = null;

        return function (event: MouseEvent | TouchEvent): PointerDelta {
            if (event instanceof MouseEvent) {
                return { movementX: event.movementX, movementY: event.movementY };
            }

            if (event instanceof TouchEvent && event.touches.length > 0) {
                const touch = event.touches[0];
                const clientX = touch.clientX;
                const clientY = touch.clientY;

                const movementX = lastX !== null ? clientX - lastX : 0;
                const movementY = lastY !== null ? clientY - lastY : 0;

                lastX = clientX;
                lastY = clientY;

                return { movementX, movementY };
            }

            return { movementX: 0, movementY: 0 };
        };
    })();

    const handleResize = (event: MouseEvent | TouchEvent) => {
        const { movementX } = getPointerDelta(event);
        setWidth((width) => width + movementX * 2);
    };

    const handleMouseMove = (event: MouseEvent) => {
        handleResize(event);
    };

    const handleTouchMove = (event: TouchEvent) => {
        handleResize(event);
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
        document.body.style.cursor = "auto";
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleTouchEnd = () => {
        isDraggingRef.current = false;
        document.body.style.cursor = "auto";
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
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

    const handleTouchStart = () => {
        if (!parentRef.current) {
            return;
        }

        const { width } = parentRef.current.getBoundingClientRect();
        setWidth(width);

        isDraggingRef.current = true;
        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("touchend", handleTouchEnd);
    }

    // if use useEffect, the mouse move & up handlers should always remain in memory, even if the mouse is not under control.
    // also, Even if the mouse isn't used, useEffect will still run unconditionally

    return (
        <div
            ref={parentRef}
            className={styles.wrapper}
            style={{
                width,
                height
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
                onTouchStart={handleTouchStart}
            >
                <IconThreeDots />
            </div>
        </div>
    );
}
