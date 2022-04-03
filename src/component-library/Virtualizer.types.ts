import { CSSProperties } from "react";

export type PositionInfo = {
  rowIndex: number;
  columnIndex: number;
  style: CSSProperties;
};

export interface VirtualizerProps {
  numRows: number;
  numColumns: number;
  rowHeight: number | ((index: number) => number); // TODO
  columnWidth: number | ((index: number) => number); // TODO
  containerHeight: number;
  containerWidth: number;
  children: (info: PositionInfo) => JSX.Element | null;
}
