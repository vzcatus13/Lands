import { Flex, Link, Heading } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useGetCountriesQuickInfo } from '../../queries/api';
import Table from '../../components/Table';
import Twemoji from '../../components/Twemoji';
import { Link as RouterLink } from 'react-router-dom';

const BorderCountries = ({ data: { borders = [] } }) => {
  if (borders.length === 0) {
    return null;
  }

  return <BorderTable borders={borders} />;
};

const BorderTable = ({ borders }) => {
  const { data, isLoading } = useGetCountriesQuickInfo(borders);

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name.common',
        Cell: v => {
          if (v.value === undefined) return 'N/A';
          return (
            <Link
              as={RouterLink}
              to={`/country/${v.row.original.cca2.toLowerCase()}`}
            >
              <Flex
                alignItems="center"
              >
                <Twemoji
                  emoji={
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
    ],
    []
  );

  return (
    <>
      <Heading size="lg" marginBottom="10px">
        Border countries
      </Heading>
      <Table
        columns={columns}
        data={data}
        isLoading={isLoading}
        isBoxed={true}
      />
    </>
  );
};

export default BorderCountries;
