import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container } from 'react-bootstrap';
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
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`
      )
      .catch((err) => {
        setErrors(true);
      })
      .then((res) => {
        setWeather(res.data);
        setLoading(false);
      });
  }, [country.capital]);

  console.log('Weather: ', weather);

  return (
    <Container>
      <Col className='mt-5'>
        <h2>{country.name.common}</h2>
        <p>Temperature: {weather.main.temp}</p>
        <p>{weather.weather[0].description}</p>
      </Col>
    </Container>
  );
};

export default CountriesSingle;
