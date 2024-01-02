import { FC, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { Image } from 'react-bootstrap';

const Home: FC = () => {
  const isAuthorized = useSelector((state: AppState) => state.isAuthorized);
  const redirect = useNavigate();

  useEffect(() => {
    if (isAuthorized === false) {
      redirect('/');
    }
  }, [isAuthorized, redirect]);

  if (isAuthorized === false) return <></>
  
    return(
      <Container className='bg-dark mt-5 text-light p-1 rounded-1 '>

        <Row className='mb-2'>
          <Col className='text-center text-light'>
            <h2 className='bg-black rounded-2 p-1'>Välkommen till <span className='mp-green-text'>MoneyPlanner!</span></h2>
            <h5 className='bg-black rounded-2 p-1'>Din budgetplanerare</h5>
          </Col>
        </Row>

        <Row className='mb-5 align-items-center'>
          <Col className='text-center col-lg-6 col-12'>
            <Image src='/homeimg4.png' alt='example image of incomes' className='img-fluid border border-2 border-light rounded-2 '/>
          </Col>
          <Col className='text-center col-lg-6 mt-3 col-12'>
            <h3 className='mp-green-text bg-black rounded-2 p-1'>Budgettavla</h3>
            <p>Budgettavlan är din centrala planeringsarena. 
              Här skapar och anpassar du din ekonomiska plan genom att 
              ställa in mål och budgetering för olika utgiftskategorier. 
              Den ger dig en visuell överblick över din ekonomi, 
              vilket gör det lättare att se hur väl din faktiska ekonomi 
              överensstämmer med dina mål. 
              Du kan enkelt justera och anpassa din budget löpande för 
              att hålla dig på rätt spår mot dina spar- och utgiftsmål.</p> 
          </Col>          
        </Row> 

        <hr/>        

        <Row className='mt-5 mb-5 align-items-center'>
          <Col className='text-center col-lg-6 mt-3 col-12'>
            <h3 className='mp-green-text bg-black rounded-2 p-1'>Sammanfattning</h3>
            <p>Om du vill ha en analys för den månaden så behöver du registrera inkomster och utgifter.
              I inkomstsektionen kan du registrera alla dina faktiska inkomstkällor. 
              Det kan vara löneintäkter, bonusar, sidoprojekt eller andra inkomster. 
              Genom att noggrant dokumentera dina inkomster får du en tydlig bild 
              av din disponibla ekonomi och kan optimera din budget för att 
              maximera sparandet eller investeringarna.</p>
            <p>Genom att noggrant logga varje utgiftspost får du insikt i dina 
              spenderingsvanor och kan identifiera områden där du kan spara eller 
              optimera din budget. 
              Det är en kraftfull metod för att säkerställa att dina utgifter 
              är i linje med din planerade budget.</p>
            <p>I sammanfattningen kan du generera en månadsanalys 
              baserad på de inmatade uppgifterna från inkomster och utgifter. 
              Här får du en översiktlig rapport som visar hur väl du 
              har lyckats hålla dig till din planerade budget under en viss period. 
              Det ger värdefulla insikter och hjälper dig att fatta informerade 
              beslut för framtida ekonomisk planering.</p>
          </Col>
          <Col className='text-center col-lg-6 col-12'>
            <Image src='/homeimg1.png' alt='example image of summary' className='img-fluid border border-2 border-light rounded-2 '/>
          </Col>
        </Row>       
      </Container>     
    )    
}
  
export default Home;