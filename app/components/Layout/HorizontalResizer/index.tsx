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

    /**
     * Calculates the pointer movement delta for mouse and touch events.
     * Uses an IIFE (Immediately Invoked Function Expression) and closure to keep 
     * track of the previous touch coordinates (lastX, lastY) internally.
     */
    const getPointerDelta = (() => {
        // Variables to store the previous coordinates during touch drag
        let lastX: number | null = null;
        let lastY: number | null = null;

        return function (event: MouseEvent | TouchEvent): PointerDelta {
            // Mouse Event: Use the browser's built-in movement properties
            if (event instanceof MouseEvent) {
                return { movementX: event.movementX, movementY: event.movementY };
            }

            // Touch Event: Since touches don't have movement properties, calculate them manually
            if (event instanceof TouchEvent && event.touches.length > 0) {
                const touch = event.touches[0];
                const clientX = touch.clientX;
                const clientY = touch.clientY;

                // Calculate the difference if previous coordinates exist; otherwise, default to 0 (first touch)
                const movementX = lastX !== null ? clientX - lastX : 0;
                const movementY = lastY !== null ? clientY - lastY : 0;

                // Backup current coordinates for the next move event
                lastX = clientX;
                lastY = clientY;

                return { movementX, movementY };
            }

            // Fallback for edge cases (e.g., right after touch ends)
            return { movementX: 0, movementY: 0 };
        };
    })();

    /**
     * Updates the element's width based on the calculated movement delta.
     */
    const handleResize = (event: MouseEvent | TouchEvent) => {
        const { movementX } = getPointerDelta(event);
        // Multiplying movementX by 2:
        // This is typically used to make the element expand/shrink symmetrically from the center.
        setWidth((width) => width + movementX * 2);
    };

    // Event handler triggered during mouse drag
    const handleMouseMove = (event: MouseEvent) => {
        handleResize(event);
    };

    // Event handler triggered during touch drag
    const handleTouchMove = (event: TouchEvent) => {
        handleResize(event);
    };

    /**
     * Cleanup function called when mouse drag ends.
     * Removes event listeners attached to the document to prevent memory leaks.
     */
    const handleMouseUp = () => {
        isDraggingRef.current = false;
        document.body.style.cursor = "auto"; // Restore the cursor to its default state
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    /**
     * Cleanup function called when touch drag ends.
     */
    const handleTouchEnd = () => {
        isDraggingRef.current = false;
        document.body.style.cursor = "auto";
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
    };

    /**
     * Initialization function called when mouse drag starts.
     */
    const handleMouseDown = () => {
        if (!parentRef.current) {
            return;
        }

        // Fetch the current rendered width of the parent element to set the baseline for resizing
        const { width } = parentRef.current.getBoundingClientRect();
        setWidth(width);

        isDraggingRef.current = true;
        // Attach listeners to the 'document' so the drag event doesn't break 
        // even if the mouse pointer leaves the UI component's area.
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    /**
     * Initialization function called when touch drag starts.
     */
    const handleTouchStart = () => {
        if (!parentRef.current) {
            return;
        }

        // Fetch the current rendered width of the parent element to set the baseline for resizing
        const { width } = parentRef.current.getBoundingClientRect();
        setWidth(width);

        isDraggingRef.current = true;
        // Attach listeners to the 'document' so the drag event doesn't break 
        // even if the touch leaves the UI component's area.
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
