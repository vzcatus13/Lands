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
import { useTable, usePagination } from 'react-table';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

// Table can be virtualized, but it also need to be responsive to different columns width (which I don't know who to achieve)
const Table = ({
  columns = [],
  data = [],
  perPage = data.length,
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
    state: { pageSize },
  } = useTable(
    {
      columns: tableColumns,
      data: tableData,
      useControlledState: state => {
        return useMemo(
          () => ({
            ...state,
            pageSize: perPage > 0 ? perPage : 13,
          }),
          [state]
        );
      },
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
        {page.length === 0 && (
          <Tr>
            <Td colSpan={columns.length} textAlign="center">
              There is no rows to display here
            </Td>
          </Tr>
        )}

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

      {pageSize < tableData.length ? (
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
      ) : null}
    </Box>
  );
};

export default memo(Table);
