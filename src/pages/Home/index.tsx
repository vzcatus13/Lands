import {
  Box,
  Link,
  Flex,
  Text,
  InputGroup,
  Input,
  InputLeftElement,
  Icon,
  Skeleton,
} from '@chakra-ui/react';
import { useGetCountries } from '../../queries/api';
import { useEffect, useMemo, useState, useRef } from 'react';
import Twemoji from '../../components/Twemoji';
import { Link as RouterLink } from 'react-router-dom';
import PaginatedTable from '../../components/PaginatedTable';
import { VscSearch } from 'react-icons/vsc';
import { CellProps } from 'react-table';
import { Country, GiniIndex } from '../../types';

const Home = () => {
  const { data, isLoading } = useGetCountries();

  useEffect(() => {
    document.title = 'Lands';
  }, []);

  const [filterName, setFilterName] = useState('');
  const memorizedFilteredData = useRef(new Map());

  const filteredData = useMemo(() => {
    const filterNameTransformed = filterName.trim().toLowerCase();

    if (data === undefined || filterNameTransformed.length < 3) {
      memorizedFilteredData.current.clear();
      return data;
    }

    return memorizedFilteredData.current.has(filterNameTransformed)
      ? memorizedFilteredData.current.get(filterNameTransformed)
      : (() => {
          const results = data.filter(d => {
            return (
              d.name.common.toLowerCase().includes(filterNameTransformed) ||
              d.name.official.toLowerCase().includes(filterNameTransformed)
            );
          });
          memorizedFilteredData.current.set(filterNameTransformed, results);
          return results;
        })();
  }, [filterName, data]);

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
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
                <Text
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  overflow="hidden"
                >{`${v.value.common} (${v.value.official})`}</Text>
              </Flex>
            </Link>
          );
        },
      },
      {
        Header: 'Independent',
        accessor: 'independent',
        Cell: v => {
          if (v.value === undefined) return 'N/A';
          return v.value ? (
            <Box color="green.500">Yes</Box>
          ) : (
            <Box color="red.500">No</Box>
          );
        },
      },
      {
        Header: 'UN Member',
        accessor: 'unMember',
        Cell: v => {
          if (v.value === undefined) return 'N/A';
          return v.value ? (
            <Box color="green.500">Yes</Box>
          ) : (
            <Box color="red.500">No</Box>
          );
        },
      },
      {
        Header: 'Gini coefficient (in %)',
        accessor: 'gini',
        isNumeric: true,
        Cell: (v: CellProps<Country, GiniIndex>) => {
          if (v.value === undefined) return 'N/A';
          if (Object.keys(v.value).length === 0) return 'N/S';
          const gini = v.value[Math.max(...Object.keys(v.value).map(Number))];
          let color;

          if (gini <= 25) {
            color = 'yellow.200';
          } else if (gini <= 30) {
            color = 'yellow.400';
          } else if (gini <= 40) {
            color = 'orange.400';
          } else if (gini <= 45) {
            color = 'orange.600';
          } else if (gini <= 55) {
            color = 'red.600';
          } else if (gini <= 65) {
            color = 'red.700';
          } else if (gini > 65) {
            color = 'red.900';
          }

          return <Box color={color}>{gini}</Box>;
        },
      },
    ],
    []
  );

  return (
    <Box mx={{ base: '8px', md: '80px' }} my="16px">
      <Box width={{ base: '100%', md: '40%' }} my="20px">
        <Skeleton isLoaded={!isLoading}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={VscSearch} color="gray.400" />}
            />
            <Input
              type="text"
              placeholder="Search by name..."
              value={filterName}
              onChange={e => setFilterName(e.target.value)}
            />
          </InputGroup>
        </Skeleton>
      </Box>
      <PaginatedTable
        columns={columns}
        data={filteredData}
        isLoading={isLoading}
        isBoxed={true}
      />
    </Box>
  );
};

export default Home;
