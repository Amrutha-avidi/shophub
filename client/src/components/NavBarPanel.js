import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../store/authSlice';
import { toast } from 'react-toastify';

const NavBarPanel = () => {
  const dispatch = useDispatch()
  const { cartQuantity } = useSelector((state) => state.cart)
  const auth = useSelector(state => state.auth)
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/" className='text-3xl'>
          <img src='/assests/logo.png' alt='logo' className='w-[190px]'/>
          
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className='px-5'>
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link to="/" as={Link} className='px-4 font-semibold' >Product</Nav.Link>
            <Nav.Link to="/cart" as={Link} className='px-4 font-semibold'>Cart 
            <span style={{ backgroundColor: 'red', color: 'white', fontSize: '15px', fontWeight: 'bold' }} className='p-1 rounded-full'>{cartQuantity}</span></Nav.Link>

            {auth._id ? (
              <>
                <Nav.Link onClick={() => {
                  dispatch(logoutUser(null))
                  toast.warning("Logged Out", { position: 'bottom-left' })
                }}>Logout</Nav.Link>

              </>
            ) : (
              <>
                <Nav.Link to='/login' as={Link} className='px-4 font-semibold'>Login</Nav.Link>
                <Nav.Link to='/register' as={Link} className='px-4 font-semibold'>Register</Nav.Link></>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default NavBarPanel