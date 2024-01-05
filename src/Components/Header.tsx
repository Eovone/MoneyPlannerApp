import { FC, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import MenuIcon from '@mui/icons-material/Menu';
import { Image } from 'react-bootstrap';

const Header: FC = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const isAuthorized = useSelector((state: AppState) => state.isAuthorized);
  const userName = useSelector((state: AppState) => state.userName);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();  
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <Navbar className="bg-body-tertiary" expand="lg" expanded={expanded}>
      <Container>
        <Link to="/home" className="navbar-brand">
          <Image src='/mpicon.png' className='rounded-2'></Image>
          <Navbar.Brand className="white-text"> MoneyPlanner</Navbar.Brand>
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
                  <Button variant="light" className={`m-1 ${isActive('/home')}`}>Hem</Button>
                </Link>
                <Link to="/planning">
                  <Button variant="light" className={`m-1 ${isActive('/planning')}`}>Budgetplanering</Button>
                </Link>
                <Link to="/summary">
                  <Button variant="light" className={`m-1 ${isActive('/summary')}`}>Sammanfattning</Button>
                </Link>
                <Link to="/incomes">
                  <Button variant="light" className={`m-1 ${isActive('/incomes')}`}>Inkomster</Button>
                </Link>
                <Link to="/expenses">
                  <Button variant="light" className={`m-1 ${isActive('/expenses')}`}>Utgifter</Button>
                </Link>

                <Navbar.Text className="white-text">{userName}</Navbar.Text>
                <Link to="/">
                  <Button variant="light" onClick={handleLogout}>
                    Logga ut
                  </Button>
                </Link>
                
              </Nav>

            </>
          ) : (
            <>
              <Nav className="custom-centered-nav">
                <Link to="/">
                  <Button variant="light" className={`m-1 ${isActive('/')}`}>Logga in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="light" className={`m-1 ${isActive('/register')}`}>Inget konto? Registrera dig</Button>
                </Link>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;