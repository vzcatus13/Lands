import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Skeleton,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { memo, useMemo } from 'react';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { usePagination, useTable } from 'react-table';

const PaginatedTable = ({
  columns = [],
  data = [],
  perPage = 13,
  isBoxed = false,
  isLoading = false,
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
            Cell: <Skeleton height="20px" speed="0" />,
          }))
        : columns,
    [isLoading, columns]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
  } = useTable(
    {
      columns: tableColumns,
      data: tableData,
      initialState: { pageSize: perPage },
    },
    usePagination
  );

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
        {page.map(row => {
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

  return (
    <Box>
      {isBoxed ? (
        <Box p="5" borderWidth="1px" borderRadius="lg" overflow="auto">
          <RenderedTable />
        </Box>
      ) : (
        <RenderedTable />
      )}

      <Flex justifyContent="space-between" marginTop="15px">
        <IconButton
          w="48px"
          h="48px"
          fontSize="24px"
          variant="ghost"
          aria-label="Previous Page"
          icon={<VscChevronLeft />}
          isDisabled={!canPreviousPage}
          onClick={previousPage}
        />
        <IconButton
          w="48px"
          h="48px"
          fontSize="24px"
          variant="ghost"
          aria-label="Next Page"
          icon={<VscChevronRight />}
          isDisabled={!canNextPage}
          onClick={nextPage}
        />
      </Flex>
    </Box>
  );
};

export default memo(PaginatedTable);
