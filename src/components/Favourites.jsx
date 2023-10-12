import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { initializeCountries } from '../features/countries/countriesSlice';
import {
  clearFavourites,
  getFavouritesFromSource,
} from '../features/countries/favouritesSlice';
import CountryCard from './CountryCard';

const Favourites = () => {
  const dispatch = useDispatch();
  let countriesList = useSelector((state) => state.countries.countries);
  const countriesLoading = useSelector((state) => state.countries.isLoading);
  const favouritesLoading = useSelector((state) => state.favourites.isLoading);
  const [search, setSearch] = useState('');
  const favouritesList = useSelector((state) => state.favourites.favourites);
  if (favouritesList !== null) {
    countriesList = countriesList.filter((c) =>
      favouritesList.includes(c.name.common)
    );
  } else {
    countriesList = [];
  }
  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

  if (favouritesLoading || countriesLoading) {
    return (
      <Col className='text-center m-5'>
        <Spinner
          animation='border'
          role='status'
          className='center'
          variant='info'
        >
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </Col>
    );
  }
  return (
    <Container fluid>
      <Row>
        <Col className='mt-4 d-flex flex-wrap justify-content-center'>
          <Form className='mt-3'>
            <Form.Control
              style={{ width: '18rem' }}
              type='search'
              className='me-2 '
              placeholder='Search for favourites'
              aria-label='Search'
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
          <Button
            className='mt-3'
            onClick={() => {
              dispatch(clearFavourites());
            }}
          >
            Clear Favourites
          </Button>
        </Col>
      </Row>
      <Row xs={1} sm={2} md={3} lg={4} className='g-4 mx-2'>
        {countriesList.reduce((acc, country) => {
          if (
            country.name.common.toLowerCase().includes(search.toLowerCase())
          ) {
            acc.push(
              <CountryCard country={country} key={country.name.common} />
            );
          }
          return acc;
        }, [])}
      </Row>
    </Container>
  );
};
export default Favourites;
