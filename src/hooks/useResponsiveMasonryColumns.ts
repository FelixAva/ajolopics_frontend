import { useCallback, useEffect, useState } from 'react';

interface UseResponsiveMasonryColumnsOptions {
  minColumns?: number;
  mediumColumns?: number;
  maxColumns?: number;
  mediumBreakpoint?: number;
  largeBreakpoint?: number;
}

const clampColumns = (columns: number, minColumns: number, maxColumns: number) =>
  Math.min(Math.max(columns, minColumns), maxColumns);

export const useResponsiveMasonryColumns = ({
  minColumns = 2,
  mediumColumns = 3,
  maxColumns = 4,
  mediumBreakpoint = 768,
  largeBreakpoint = 1024,
}: UseResponsiveMasonryColumnsOptions = {}) => {
  const getColumnsNumber = useCallback(() => {
    if (typeof window === 'undefined') return minColumns;

    if (window.innerWidth >= largeBreakpoint) return maxColumns;
    if (window.innerWidth >= mediumBreakpoint) {
      return clampColumns(mediumColumns, minColumns, maxColumns);
    }

    return minColumns;
  }, [largeBreakpoint, maxColumns, mediumBreakpoint, mediumColumns, minColumns]);

  const [columnsNumber, setColumnsNumber] = useState(getColumnsNumber);

  useEffect(() => {
    const handleResize = () => {
      setColumnsNumber(getColumnsNumber());
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [getColumnsNumber]);

  return columnsNumber;
};
