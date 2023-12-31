import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet } from 'react-router-dom';
import { auth, logout } from '../auth/firebase';

const Layout = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <Container fluid>
      <Row>
        <Navbar
          bg='light'
          variant='light'
          expand='lg'
          collapseOnSelect
          className='shadow-sm rounded'
        >
          <Container className='justify-content-end'>
            <LinkContainer to='/'>
              <Navbar.Brand href='/'>
                Countries App <i className='bi bi-globe'></i>
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <LinkContainer to='/'>
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/countries'>
                  <Nav.Link>Countries</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/favourites'>
                  <Nav.Link>Favourites</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav>
                {!user ? (
                  <>
                    <LinkContainer to='/register'>
                      <Nav.Link>Register</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/login'>
                      <Button variant='primary' hidden={loading}>
                        Login
                      </Button>
                    </LinkContainer>
                  </>
                ) : (
                  <>
                    <Navbar.Text className='me-2'>
                      <i className='bi bi-person-circle'></i> {user.email}
                    </Navbar.Text>
                    <Button variant='primary' hidden={loading} onClick={logout}>
                      Logout
                    </Button>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
      <Row>
        <Outlet />
      </Row>
    </Container>
  );
};

export default Layout;
