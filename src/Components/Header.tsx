import { FC, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { resetState } from '../Store/actionCreators';
import MenuIcon from '@mui/icons-material/Menu';

const Header: FC = () => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const isAuthorized = useSelector((state: AppState) => state.isAuthorized);
  const userName = useSelector((state: AppState) => state.userName);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(resetState());
  };

  return (
    <Navbar className="bg-body-tertiary" expand="lg" expanded={expanded}>
      <Container>
        <Link to="/home" className="navbar-brand">
          <Navbar.Brand className="white-text">MoneyPlanner</Navbar.Brand>
        </Link>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        >
          <MenuIcon className="white-text" />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          {isAuthorized ? (
            <>
              <Nav className="custom-centered-nav">
                <Link to="/home">
                  <Button variant="light" className='m-1'>Hem</Button>
                </Link>
                <Link to="/incomes">
                  <Button variant="light" className='m-1'>Inkomster</Button>
                </Link>
                <Link to="/expenses">
                  <Button variant="light" className='m-1'>Utgifter</Button>
                </Link>

                <Navbar.Text className="white-text">{userName}</Navbar.Text>
                <Button variant="light" onClick={handleLogout} className="mx-2">
                    Logga ut
                </Button>
              
              </Nav>

            </>
          ) : (
            <>
              <Nav className="custom-centered-nav">
                <Link to="/">
                  <Button variant="light">Logga in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="light">Inget konto? Registrera dig</Button>
                </Link>
              </Nav>
              <Navbar.Text className="white-text">Ej inloggad</Navbar.Text>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;