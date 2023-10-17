import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const CountriesSingle = () => {
  // Function hooks
  const location = useLocation();
  const navigate = useNavigate();

  // State hooks
  const [weather, setWeather] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  // Destructuring
  const country = location.state.country;

  // Get the cca3 codes of the neighbouring countries
  const borderCountries = Object.values(country.borders ?? {});
  // Use countries state from Redux to match the cca3 codes to the country names and get the full country object
  const countriesList = useSelector((state) => state.countries.countries);

  useEffect(() => {
    if (!country.capital) {
      setLoading(false);
      setErrors(true);
    } else {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`
        )
        .then((res) => {
          setWeather(res.data);
          setLoading(false);
        })
        .catch((error) => {
          // If the city is not found, try fetching weather data with the country name
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?q=${country.name.official}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`
            )
            .then((res) => {
              setWeather(res.data);
            })
            .catch((error) => {
              console.log(error);
              setErrors(true);
            })
            .finally(() => {
              setLoading(false);
            });
        });
    }
  }, [country.capital, country.name.official]);

  //console.log('Weather: ', weather);

  if (loading) {
    return (
      <Container>
        <Spinner
          animation='border'
          role='status'
          className='center'
          variant='info'
        >
          {/* Accessiblity */}
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className='mt-4'>
      <Container className='bg-light p-4 rounded'>
        <Row
          xs={1}
          sm={2}
          md={3}
          lg={4}
          className='g-3 d-flex justify-content-center'
        >
          <Col>
            <h2 className='display-4'>{country.name.common}</h2>
            <p className='fs-5'>
              <i class='bi bi-globe'></i> {country.subregion}
            </p>
            <h3>{country.capital}</h3>
            {errors && (
              <p>Sorry, we don't have weather information for this country</p>
            )}
            {!errors && weather && (
              <>
                <p>
                  Right now it is <strong>{parseInt(weather.main.temp)}</strong>{' '}
                  degrees in {country.capital} and{' '}
                  {weather.weather[0].description}
                </p>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={`${weather.weather[0].description}`}
                  className='bg-info rounded mb-3'
                />
              </>
            )}
            {borderCountries.length > 0 && (
              <div>
                <p>Countries bordering {country.name.common}:</p>
                {borderCountries.map((borderCode) => {
                  const borderCountry = countriesList.find(
                    (country) => country.cca3 === borderCode
                  );
                  if (borderCountry) {
                    return (
                      <LinkContainer
                        key={borderCountry.cca3}
                        to={`/countries/${borderCountry.name.common}`}
                        state={{ country: borderCountry }}
                      >
                        <Button
                          variant='secondary'
                          size='sm'
                          className='me-2 mb-2'
                        >
                          {borderCountry.name.common}
                        </Button>
                      </LinkContainer>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </Col>
          <Col>
            <Image
              thumbnail
              src={`https://source.unsplash.com/1600x900/?${country.capital}`}
            />
          </Col>
          <Col>
            <iframe
              title='Google Maps Embed'
              src={`https://www.google.com/maps/embed/v1/place?key=${
                process.env.REACT_APP_GOOGLE_MAPS_EMBED_API_KEY
              }&q=${
                encodeURIComponent(country.capital) +
                '+' +
                encodeURIComponent(country.name.common)
              }`}
              width='100%'
              height='100%'
              allowFullScreen
            ></iframe>
          </Col>
        </Row>
      </Container>
      <Row className='my-4'>
        <Col className='d-flex justify-content-center'>
          <Button variant='dark' onClick={() => navigate('/countries')}>
            <i class='bi bi-arrow-left-short'></i> Back to countries
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CountriesSingle;
