import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row, Spinner } from 'react-bootstrap';
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

  console.log('Weather: ', weather);

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
    <Container>
      <Row className='mt-5'>
        <Col>
          <iframe
            title='Google Maps Embed'
            src={`https://www.google.com/maps/embed/v1/place?key=${
              process.env.REACT_APP_GOOGLE_MAPS_EMBED_API_KEY
            }&q=${encodeURIComponent(country.capital)}`}
            width='100%'
            height='100%'
            allowFullScreen
          ></iframe>
        </Col>
        <Col>
          <Image
            thumbnail
            src={`https://source.unsplash.com/1600x900/?${country.capital}`}
          />
        </Col>
        <Col>
          <h2 className='display-4'>{country.name.common}</h2>
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
              />
            </>
          )}
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col>
          <Button variant='dark' onClick={() => navigate('/countries')}>
            Back to countries
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CountriesSingle;
