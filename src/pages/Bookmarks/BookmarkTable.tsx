import Table from '../../components/Table';
import { Link, Flex } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Twemoji from '../../components/Twemoji';
import { useMemo } from 'react';
import { useGetCountriesQuickInfo } from '../../queries/api';
import RemoveButton from './RemoveButton';
import { CellProps } from 'react-table';
import { Country } from '../../types';

const BookmarkTable = ({ bookmarks }: { bookmarks: string[] }) => {
  const { data = [], isLoading } = useGetCountriesQuickInfo(bookmarks);

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name.common',
        Cell: (v: CellProps<Country>) => {
          if (v.value === undefined) return 'N/A';
          return (
            <Link
              as={RouterLink}
              to={`/country/${v.row.original.cca2.toLowerCase()}`}
            >
              <Flex alignItems="center">
                <Twemoji
                  emoji={
                    v.row.original.flag !== undefined &&
                    v.row.original.flag.length !== 0
                      ? v.row.original.flag
                      : '🤷'
                  }
                  marginEnd={4}
                  boxSize={{ base: 9, md: 7 }}
                />
                {v.value}
              </Flex>
            </Link>
          );
        },
      },
      {
        Header: 'Location',
        accessor: 'subregion',
      },
      {
        Header: 'Actions',
        id: 'actions',
        Cell: (v: CellProps<Country>) => {
          return <RemoveButton countryCode={v.row.original.cca2} />;
        },
      },
    ],
    []
  );

  return (
    <Table columns={columns} data={data} isLoading={isLoading} isBoxed={true} />
  );
};

export default BookmarkTable;
