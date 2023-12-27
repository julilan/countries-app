import React from "react";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { LinkContainer } from "react-router-bootstrap";
import { auth } from "../auth/firebase";

const Home = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <div
      className='d-flex min-vh-100'
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1589403992174-da57ba171563?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#444",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className='align-self-center text-center text-light col-md-8 offset-md-2'>
        <div className='mb-4'>
          <h1 className='display-1 fw-bolder'>Welcome to Countries App!</h1>
        </div>
        <div className='my-4'>
          <p className='lead'>
            A React application made in Business College Helsinki lessons.
          </p>
        </div>
        <div className='d-flex flex-column flex-sm-row justify-content-center gap-2 gap-sm-5'>
          {!user && (
            <>
              <div className='mb-2'>
                <p>Start browsing countries by logging in!</p>
                <LinkContainer to='/login'>
                  <Button variant='primary' hidden={loading}>
                    Login <i className='bi bi-arrow-right-short'></i>
                  </Button>
                </LinkContainer>
              </div>
            </>
          )}
          <div>
            <p>Check out the source code:</p>
            <Button
              variant='outline-light'
              href='https://github.com/julilan/countries-app'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='bi bi-github'></i> GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
