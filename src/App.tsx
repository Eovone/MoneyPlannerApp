import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomStyles/ButtonOverride.css';
import './CustomStyles/HeaderOverride.css';
import './CustomStyles/FormOverride.css';
import Home from './Views/Home';
import {Routes, Route} from 'react-router-dom';
import CreateUserForm from './Components/CreateUserForm';
import { useState } from 'react';
import Header from './Components/Header';
import LoginUserForm from './Components/LoginUserForm';
import Alert from 'react-bootstrap/Alert';

function App() {
  const [userName, setUserName] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleAlert = (success: boolean) => {
    success ? setAlertSuccess(true) : setAlertSuccess(false);

    setShowAlert(true);
    
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  }

  return (
    <div>     
      <Header userName={userName} />
      {showAlert ? <Alert variant={ alertSuccess ? 'success' : 'danger' } 
                          onClose={() => setShowAlert(false)} 
                          dismissible 
                          className='text-center'>
          {alertMessage}
      </Alert> : null }
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/register' element={<CreateUserForm handleAlert={handleAlert} setAlertMessage={setAlertMessage} />} />
        <Route path='/' element={<LoginUserForm handleAlert={handleAlert} setAlertMessage={setAlertMessage} />} />
      </Routes>
    </div>
  );
}

export default App;