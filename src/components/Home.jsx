import React from 'react';
import { Button } from 'react-bootstrap';

const Home = () => {
  return (
    <div
      className='d-flex min-vh-100'
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1589403992174-da57ba171563?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#444',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className='align-self-center text-center text-light col-md-8 offset-md-2'>
        <div className='mb-4'>
          <h1 className='display-1 fw-bolder'>Welcome to Countries App!</h1>
        </div>
        <div className='mb-4'>
          <p className='lead'>
            A React application made in Business College Helsinki lessons.
          </p>
        </div>
        <Button>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://github.com/julilan/countries-app'
            className='text-decoration-none text-light'
          >
            <i className='bi bi-github'></i> GitHub
          </a>
        </Button>
      </div>
      {/* <div>
        <h2>Welcome to Countries App!</h2>
        <p>A React application made in Business College Helsinki lessons.</p>
        <p>
          This app uses{' '}
          <a href='https://restcountries.com/'>https://restcountries.com/ </a>{' '}
          and{' '}
          <a href='https://openweathermap.org/'>https://openweathermap.org/</a>
        </p>
      </div> */}
    </div>
  );
};

export default Home;
