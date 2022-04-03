import React, { useCallback, useEffect, useMemo, useState } from "react";
import { generateGrid } from "../utilities/generateGrid";
import { PositionInfo, VirtualizerProps } from "./Virtualizer.types";

const checkNumberProp = (prop: any, fallback: number): number => {
  if (typeof prop === "number") {
    return prop;
  } else {
    return fallback;
  }
};

const checkNumberOrFunctionProp = (
  prop: any,
  fallback: number
): number | ((index: number) => number) => {
  if (typeof prop === "number" || typeof prop === "function") {
    return prop;
  } else {
    return fallback;
  }
};

const checkFunctionProp = (
  prop: any,
  fallback: () => null
): ((info: PositionInfo) => JSX.Element | null) => {
  if (typeof prop === "function") {
    return prop;
  } else {
    return fallback;
  }
};

const getItemsTotalSize = (itemSize: number | ((index: number) => number), itemCount: number) => {
  return typeof itemSize === "number"
    ? itemCount * itemSize
    : new Array(itemCount) // TODO
      .fill(null)
      .reduce<number>((acc, _, index) => acc + itemSize(index), 0);
};

const getIndexByPositionAndSize = (scrollPosition: number, itemSize: number | ((index: number) => number)) => {
  if (typeof itemSize === "number" && itemSize > 0) {
    return Math.floor(scrollPosition / itemSize);
  }
  return 0; // TODO
};

export const Virtualizer = React.memo<VirtualizerProps>((props) => {
  const numRows = checkNumberProp(props.numRows, 0);
  const numColumns = checkNumberProp(props.numColumns, 0);
  const rowHeight = checkNumberOrFunctionProp(props.rowHeight, 0);
  const columnWidth = checkNumberOrFunctionProp(props.columnWidth, 0);
  const containerHeight = checkNumberProp(props.containerHeight, 0);
  const containerWidth = checkNumberProp(props.containerWidth, 0);
  const children = checkFunctionProp(props.children, () => null);

  const totalHeight = useMemo(() => getItemsTotalSize(rowHeight, numRows), [rowHeight, numRows]);
  const totalWidth = useMemo(() => getItemsTotalSize(columnWidth, numColumns), [columnWidth, numColumns]);

  const [firstVisibleRow, setFirstVisibleRow] = useState(0);
  const [lastVisibleRow, setLastVisibleRow] = useState(0);
  const [firstVisibleColumn, setFirstVisibleColumn] = useState(0);
  const [lastVisibleColumn, setLastVisibleColumn] = useState(0);

  const recalculatePosition = useCallback((scrollTop: number, scrollLeft: number) => {
      setFirstVisibleRow(getIndexByPositionAndSize(scrollTop, rowHeight));
      setLastVisibleRow(getIndexByPositionAndSize((scrollTop + containerHeight), rowHeight));
      setFirstVisibleColumn(getIndexByPositionAndSize(scrollLeft, columnWidth));
      setLastVisibleColumn(getIndexByPositionAndSize((scrollLeft + containerWidth), columnWidth));
    },
    [rowHeight, columnWidth, containerHeight, containerWidth]
  );

  const onScroll: React.UIEventHandler<HTMLDivElement> = ({ currentTarget }) => {
    const { scrollTop, scrollLeft } = currentTarget;
    recalculatePosition(scrollTop, scrollLeft);
  };

  useEffect(() => {
    recalculatePosition(0, 0)
  }, [])

  return (
    <div
      style={{
        height: containerHeight,
        width: containerWidth,
        overflow: "auto",
      }}
      onScroll={onScroll}
    >
      <div
        style={{
          position: "relative",
          height: totalHeight,
          width: totalWidth,
          overflow: "hidden",
        }}
      >
        {generateGrid<JSX.Element | null>(
          lastVisibleRow + 1 - firstVisibleRow,
          lastVisibleColumn + 1 - firstVisibleColumn,
          (y, x) => {
            const rowIndex = firstVisibleRow + y;
            const columnIndex = firstVisibleColumn + x;
            const style: React.CSSProperties = {
              position: "absolute",
              top: getItemsTotalSize(rowHeight, rowIndex),
              left: getItemsTotalSize(columnWidth, columnIndex),
              height:
                typeof rowHeight === "number"
                  ? rowHeight
                  : rowHeight(rowIndex),
              width:
                typeof columnWidth === "number"
                  ? columnWidth
                  : columnWidth(columnIndex),
            };
            return children({ rowIndex, columnIndex, style });
          })
        }
      </div>
    </div>
  );
});
