import { FC } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

interface HomeProps {
  isAuthorized: boolean;
}

const Home: FC<HomeProps> = (props) => {

    return(
      <Container>
        <Row>
          <Col>
            <h1 className='text-center text-light'>Din Ekonomi</h1>
          </Col>
        </Row>
      </Container>     
    )    
}
  
  export default Home;