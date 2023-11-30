import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";

interface HeaderProps{
    userName: string;
}

const Header: FC<HeaderProps> = (props) => {
    return(
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
                        {props.userName !== '' ? `Inloggad som: ${props.userName}` : 'Ej inloggad'}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )    
}
  
  export default Header;