import { FC, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  isAuthorized: boolean;
}

const Home: FC<HomeProps> = (props) => {

const redirect = useNavigate();

    useEffect(() => {
      console.log("useEffect körs")
        if(props.isAuthorized === false || props.isAuthorized === undefined){
          redirect('/');
        }
    }, [props.isAuthorized, redirect]);

    return(
      <Container className='darkBackground'>
        <Row>
          <Col>
            <h1 className='text-center mp-green-text'>Din Ekonomi</h1>
          </Col>
        </Row>
      </Container>     
    )    
}
  
  export default Home;