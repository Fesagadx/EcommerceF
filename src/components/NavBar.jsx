import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Cart from './Cart';
import { setCart } from '../store/slices/cart.slice';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const purchase = () => {
    if (token) {
      navigate('/purchase');
    } else {
      navigate('/login');
    }
  };

  const handleShow = () => {
    if (token) {
      setShow(true);
    } else {
      navigate('/login');
    }
  };

  const user = localStorage.getItem('user');
  const dispatch = useDispatch();


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    dispatch(setCart([]));
  }

  return (
    <section className='navbar-component'>
      <Navbar className='navbar-fixed'>
        <Nav className="navbar-component-nav">
          <Container>
            <Navbar className='navbar-title' as={Link} to="/">e-commerce </Navbar>
          </Container>
          <section className='nav-purchase'>
            <Nav.Link onClick={purchase} ><i className='bx bx-store bx-md' ></i></Nav.Link>
          </section>
          <section className='nav-car'>
            <Nav.Link onClick={handleShow} ><i className='bx bx-cart bx-tada bx-md'></i></Nav.Link>
          </section>
          <span className='nav-user-welcome'>{user && `${user}`}</span>
          <section className='nav-login'  >
            {
              user ? <Nav.Link onClick={logout}><i className='bx bx-arrow-back bx-md'></i></Nav.Link> : <Nav.Link as={Link} to="/login"><i className='bx bx-user bx-md'></i></Nav.Link>
            }
          </section>
        </Nav>
      </Navbar>
      <Cart show={show} setShow={setShow} handleClose={handleClose} ></Cart>
    </section>
  )
}

export default NavBar;