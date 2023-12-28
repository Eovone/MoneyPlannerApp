import { FC } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Image } from 'react-bootstrap';
import LoginUserForm from '../Components/User/LoginUserForm';
import { useLocation } from 'react-router-dom';

const LoginView: FC = () => {  
  
    return(
      <Container className='mt-3 text-light p-1 rounded-1'>

        <LoginUserForm />

        <div className='bg-dark p-1 rounded-1'>
        <Row className='mb-2'>
          <Col className='text-center text-light'>
            <h2 className='bg-black rounded-2 p-1'>Välkommen till <span className='mp-green-text'>MoneyPlanner!</span></h2>
            <h5 className='bg-black rounded-2 p-1'>Din budgetplanerare</h5>
          </Col>
        </Row>

        <Row>
          <Col className='text-center col-lg-6 mt-3 col-12'>
            <h3 className='mp-green-text bg-black rounded-2 p-1'>Inkomster</h3>
            <p>Här har du möjlighet att registrera dina inkomster. När du har återkommande inkomster, så som lön eller barnbidrag så registrerar man det som sådant.</p>
            <p>Övriga inkomster används för de inkomster som endast är tillfälliga, så som aktieutdelning.</p>
          </Col>
          <Col className='text-center col-lg-6 col-12'>
            <Image src='/homeimg2.png' alt='example image of incomes' className='img-fluid border border-2 border-light rounded-2 '/>
          </Col>
        </Row> 

        <hr/>

        <Row>
          <Col className='text-center col-lg-6 col-12'>
            <Image src='/homeimg3.png' alt='example image of expenses' className='img-fluid border border-2 border-light rounded-2 '/>
          </Col>
          <Col className='text-center col-lg-6 mt-3 col-12'>
            <h3 className='mp-green-text bg-black rounded-2 p-1'>Utgifter</h3>
            <p>Alla dina utgifter har du möjlighet att registrera. Du kan kategorisera dina utgifter som är återkommande, så som hyra och andra avgifter.</p>
            <p>Eller som övriga utgifter används för de utgifter som endast är tillfälliga, så som bilservice.</p>
          </Col>
        </Row>

        <hr/>

        <Row>
          <Col className='text-center col-lg-6 mt-3 col-12'>
            <h3 className='mp-green-text bg-black rounded-2 p-1'>Sammanfattning</h3>
            <p>Efter registrering av inkomster och utgifter så har du möjlighet att generera en månadsanalys för att få en sammanställning av din ekonomi.</p>
            <p>Du har inte möjlighet att generera en månadsanalys om du inte har några inkomster eller utgifter.</p>
          </Col>
          <Col className='text-center col-lg-6 col-12'>
            <Image src='/homeimg1.png' alt='example image of summary' className='img-fluid border border-2 border-light rounded-2 '/>
          </Col>
        </Row>     
        </div>  
      </Container>     
    )    
}
  
export default LoginView;