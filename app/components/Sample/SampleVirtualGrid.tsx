"use client";

// react
import { useRef, useState, useEffect } from "react";
// lodash
import { throttle } from "lodash";
// tanstack virtual
import { useVirtualizer } from "@tanstack/react-virtual";
// styles
import style from "@components/Sample/SampleVirtualGrid.module.scss";
// hooks
import useResizeObserver from "@hooks/useResizeObserver";

const BREAKPOINT = {
    xs: 375,
    sm: 640,
    lg: 1024
};
const ITEM_RATIO = 16 / 9;

export default function VirtualizedResponsiveGrid() {
    const parentRef = useRef<HTMLDivElement>(null);

    const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
    const [columns, setColumns] = useState(4);
    const [gap, setGap] = useState({
        x: 10,
        y: 10
    });

    const [itemSize, setItemSize] = useState({
        width: 0,
        height: 0
    });

    const { width: containerWidth } = useResizeObserver(parentRef);
    
    const rowVirtualizer = useVirtualizer({
        count: Math.ceil(items.length / columns),
        getScrollElement: () => parentRef.current,
        estimateSize: () => itemSize.height + gap.y,
        overscan: 2
    });

    const columnVirtualizer = useVirtualizer({
        horizontal: true,
        count: columns,
        getScrollElement: () => parentRef.current,
        estimateSize: () => itemSize.width + gap.x,
        overscan: 2
    });

    useEffect(() => {
        rowVirtualizer.measure();
        columnVirtualizer.measure();
    }, [itemSize.height, columns]);

    const getItemGap = (width: number) => {
        if (width <= BREAKPOINT.xs) {
            return {
                x: 0,
                y: 7.5
            }
        }

        if (width <= BREAKPOINT.sm) {
            return {
                x: 7.5,
                y: 7.5
            }
        }

        return {
            x: 10,
            y: 10
        }
    };

    const getColumnsCount = (width: number) => {
        if (width <= BREAKPOINT.xs) {
            return 3;
        }

        if (width <= BREAKPOINT.sm) {
            return 5;
        }

        return 4;
    };

    const getItemWidth = (width: number, columns: number, gapX: number) => {
        return Math.floor((width - (columns - 1) * gapX) / columns);
    };

    const getItemHeight = (width: number, itemWidth: number) => {
        if (width >= BREAKPOINT.sm) {
            return itemWidth / ITEM_RATIO;
        }

        return itemWidth;
    };

    const handleResize = throttle(() => {
        const gap = getItemGap(containerWidth);
        const column = getColumnsCount(containerWidth);
        const itemWidth = getItemWidth(containerWidth, column, gap.x);
        const itemHeight = getItemHeight(containerWidth, itemWidth);

        setGap(gap);
        setColumns(column);
        setItemSize({
            width: itemWidth,
            height: itemHeight
        });
    }, 200);

    useEffect(() => {
        if (!containerWidth) {
            return;
        }

        handleResize();
    }, [containerWidth]);

    return (
        <div
            ref={parentRef}
            className={style.wrapper}
        >
            <div
                className={style.virtualWrapper}
                style={{
                    width: `${columnVirtualizer.getTotalSize() - gap.x}px`,
                    height: `${rowVirtualizer.getTotalSize() - gap.y}px`
                }}
            >
                {rowVirtualizer.getVirtualItems().map((virtualRow) =>
                    columnVirtualizer.getVirtualItems().map((virtualColumn) => {
                        const itemIndex = virtualRow.index * columns + virtualColumn.index;
                        if (itemIndex >= items.length) {
                            return null;
                        }

                        return (
                            <div
                                key={itemIndex}
                                className={style.itemWrapper}
                                style={{
                                    width: itemSize.width,
                                    height: itemSize.height,
                                    transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`
                                }}
                            >
                                <div
                                    key={itemIndex}
                                    className={style.item}
                                >
                                    Item {itemIndex}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
