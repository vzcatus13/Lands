import { render, screen } from '@testing-library/react';
import Table from './Table';
import userEvent from '@testing-library/user-event';

const columns = [
  {
    Header: 'Country',
    accessor: 'country',
  },
  {
    Header: 'Capital',
    accessor: 'capital',
  },
];

const data = [
  { country: 'Comoros', city: 'Moroni' },
  { country: 'Cuba', city: 'Havana' },
  { country: 'Greece', city: 'Greece' },
  { country: 'Peru', city: 'Lima' },
  { country: 'China', city: 'Beijing' },
  { country: 'Jamaica', city: 'Kingston' },
  { country: 'Pakistan', city: 'Islamabad' },
  { country: 'South Korea', city: 'Seoul' },
  { country: 'Sweden', city: 'Stockholm' },
  { country: 'Moldova', city: 'Chisinau' },
];

describe('Table Component', () => {
  it('should display empty message for no rows and not render pagination', () => {
    render(<Table columns={columns} data={[]} />);

    expect(
      screen.getByText(/there is no rows to display here/i)
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: /previous page/i })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: /next page/i })
    ).not.toBeInTheDocument();
  });

  it('should not render table in pagination mode if rows per page are not specified', () => {
    render(<Table columns={columns} data={data} />);

    // data.length + 1: length of data + header row
    expect(screen.getAllByRole('row')).toHaveLength(data.length + 1);

    expect(
      screen.queryByRole('button', { name: /previous page/i })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: /next page/i })
    ).not.toBeInTheDocument();
  });

  it('should display disabled state of pagination buttons', () => {
    const rowsPerPage = 4;
    render(<Table columns={columns} data={data} perPage={rowsPerPage} />);

    const previousPageButton = screen.getByRole('button', {
      name: /previous page/i,
    });
    const nextPageButton = screen.getByRole('button', { name: /next page/i });

    // start of the list
    expect(previousPageButton).toBeDisabled();
    expect(nextPageButton).toBeEnabled();

    // middle of the list
    userEvent.click(nextPageButton);
    expect(previousPageButton).toBeEnabled();
    expect(nextPageButton).toBeEnabled();

    // end of the list
    userEvent.click(nextPageButton);
    expect(previousPageButton).toBeEnabled();
    expect(nextPageButton).toBeDisabled();
  });
});
