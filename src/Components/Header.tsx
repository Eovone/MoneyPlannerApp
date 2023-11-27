import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

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
                <Navbar.Text className='white-text'>
                    {props.userName !== '' ? `Inloggad som: ${props.userName}` : 'Ej inloggad'}
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )    
}
  
  export default Header;