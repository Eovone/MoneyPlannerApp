import { FC, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../Store/Store';

const Home: FC = () => {
  const isAuthorized = useSelector((state: AppState) => state.isAuthorized);
  const redirect = useNavigate();

  useEffect(() => {
    if (isAuthorized === false) {
      redirect('/');
    }
  }, [isAuthorized, redirect]);

    return(
      <Container className='darkBackground mt-5'>
        <Row>
          <Col>
            <h1 className='text-center mp-green-text'>Din Ekonomi</h1>
          </Col>
        </Row>
      </Container>     
    )    
}
  
  export default Home;