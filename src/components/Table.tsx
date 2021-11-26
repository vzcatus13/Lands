import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Skeleton,
} from '@chakra-ui/react';
import { memo, useMemo } from 'react';
import { useTable, Column } from 'react-table';

// Table can be virtualized, but it also need to be responsive to different columns width (which I don't know who to achieve)
const Table = <D extends object>({
  columns = [],
  data = [],
  isBoxed = false,
  isLoading = false,
}: {
  columns: Column<D>[];
  data: D[];
  isBoxed?: boolean;
  isLoading?: boolean;
}) => {
  const tableData = useMemo(
    () => (isLoading ? Array(5).fill({}) : data),
    [isLoading, data]
  );

  const tableColumns = useMemo(
    () =>
      isLoading
        ? columns.map(column => ({
            ...column,
            Cell: <Skeleton height="20px" speed={0} />,
          }))
        : columns,
    [isLoading, columns]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: tableColumns,
      data: tableData,
    });

  const RenderedTable = () => (
    <ChakraTable variant="simple" {...getTableProps()}>
      <Thead>
        {headerGroups.map(headerGroup => {
          return (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => {
                return (
                  <Th
                    {...column.getHeaderProps()}
                    isNumeric={column.isNumeric ?? false}
                  >
                    {column.render('Header')}
                  </Th>
                );
              })}
            </Tr>
          );
        })}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <Td
                    {...cell.getCellProps()}
                    isNumeric={cell.column.isNumeric ?? false}
                  >
                    {cell.render('Cell')}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    </ChakraTable>
  );

  return isBoxed ? (
    <Box p="5" borderWidth="1px" borderRadius="lg" overflow="auto">
      <RenderedTable />
    </Box>
  ) : (
    <RenderedTable />
  );
};

export default memo(Table);
