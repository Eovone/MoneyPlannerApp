import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { AppState } from '../Store/Store';

const Header: FC = () => { 

const isAuthorized = useSelector((state: AppState) => state.isAuthorized);
const userName = useSelector((state: AppState) => state.userName);

    return(
        isAuthorized ? (
            <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand className='white-text'>MoneyPlanner</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="custom-centered-nav">
                        <Link to="/home">
                            <Button variant="light">
                                Hem
                            </Button>
                        </Link>
                        <Link to="/incomes">
                            <Button variant="light">
                                Inkomster
                            </Button>
                        </Link>
                        <Link to="/expenses">
                            <Button variant="light">
                                Utgifter
                            </Button>
                        </Link>
                    </Nav>
                    <Navbar.Text className='white-text'>
                        Inloggad som: {userName}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar> 
        ) : (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand className='white-text'>MoneyPlanner</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="custom-centered-nav">
                        <Link to="/">
                            <Button variant="light">
                                Logga in
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="light">
                                Inget konto? Registrera dig
                            </Button>
                        </Link>
                    </Nav>
                    <Navbar.Text className='white-text'>
                        Ej inloggad
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        )
    
    )    
}
  
export default Header;