import React, { useEffect, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { initializeCountries } from '../features/countries/countriesSlice';
import CountryCard from './CountryCard';

const Countries = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  return (
    <Container fluid>
      <Row>
        <Col className='mt-4 d-flex justify-content-center'>
          <Form className='mt-3'>
            <Form.Control
              style={{ width: '18rem' }}
              type='search'
              className='me-2 '
              placeholder='Search for countries'
              aria-label='Search'
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Row xs={1} sm={2} md={3} lg={4} className='g-4 mx-2'>
        {/* Search filter */}
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

export default Countries;
