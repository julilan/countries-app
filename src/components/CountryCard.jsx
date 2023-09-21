import React from 'react';
import { Card, Col, ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CountryCard = ({ country }) => {
  const languages = [];
  for (const language in country.languages) {
    languages.push(country.languages[language]);
  }
  //console.log(country.flags.png);

  // country.currencies
  //   ? console.log(Object.values(country.currencies)[0].name)
  //   : console.log('no currency found');

  return (
    <Col className='mt-5'>
      <LinkContainer
        to={`/countries/${country.name.common}`}
        state={{ country: country }}
      >
        <Card className='h-100'>
          <Card.Body className='d-flex flex-column'>
            <Card.Title>{country.name.common}</Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>
              {country.name.official}
            </Card.Subtitle>
            <Card.Img src={country.flags.svg} alt='flag' />
            <ListGroup
              variant='flush'
              className='flex-grow-1 justify-content-end'
            >
              <ListGroup.Item>
                <i className='bi bi-translate me-2'></i> {languages.join(', ')}
              </ListGroup.Item>
              <ListGroup.Item>
                <i className='bi bi-cash-coin me-2'></i>{' '}
                {country.currencies
                  ? Object.values(country.currencies)[0].name
                  : 'no currency'}
              </ListGroup.Item>
              <ListGroup.Item>
                <i className='bi bi-people me-2'></i> {country.population}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </LinkContainer>
    </Col>
  );
};

export default CountryCard;
