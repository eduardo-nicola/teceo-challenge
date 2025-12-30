import { useWindowVirtualizer } from "@tanstack/react-virtual";
import type { ReactNode } from "react";

interface GlobalVirtualizerProps<T> {
  rowCount: number;
  rowSize: number;
  overscan: number;
  itemsPerRow: number;
  dataList: T[];
  renderRow: (items: T[]) => ReactNode;
}

const GlobalVirtualizer = <T,>({ rowCount, rowSize, overscan, itemsPerRow, dataList, renderRow }: GlobalVirtualizerProps<T>) => {
  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => rowSize,
    overscan: overscan,
  });

  return (
    <>
      <div style={{ height: `${rowCount * rowSize}px`, position: 'relative' }}>
        {rowVirtualizer.getVirtualItems().map((vRow) => {
          const startIndex = vRow.index * itemsPerRow;
          const rowItems = dataList.slice(startIndex, startIndex + itemsPerRow);

          return (
            <div
              key={vRow.key}
              data-index={vRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${vRow.start}px)`,
              }}
            >
              {renderRow(rowItems)}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default GlobalVirtualizer;