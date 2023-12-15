import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomStyles/ButtonOverride.css';
import './CustomStyles/HeaderOverride.css';
import './CustomStyles/FormOverride.css';
import Home from './Views/Home';
import { Routes, Route } from 'react-router-dom';
import CreateUserForm from './Components/CreateUserForm';
import { useState } from 'react';
import Header from './Components/Header';
import LoginUserForm from './Components/LoginUserForm';
import Alert from 'react-bootstrap/Alert';
import IncomeView from './Views/IncomeView';
import ExpenseView from './Views/ExpenseView';

function App() {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertSuccess, setAlertSuccess] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const handleAlert = (success: boolean) => {    
    success ? setAlertSuccess(true) : setAlertSuccess(false);

    setShowAlert(true);
    
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  }

  return (
    <div>     
      <Header />

      {showAlert ? <Alert variant={ alertSuccess ? 'success' : 'danger' } 
                          onClose={() => setShowAlert(false)} 
                          dismissible 
                          className='text-center'>
          {alertMessage}
      </Alert> : null }

      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/register' element={<CreateUserForm handleAlert={handleAlert} 
                                                         setAlertMessage={setAlertMessage} />} />
        <Route path='/' element={<LoginUserForm handleAlert={handleAlert} 
                                                setAlertMessage={setAlertMessage} />} />
        <Route path='/incomes' element={<IncomeView handleAlert={handleAlert} 
                                                    setAlertMessage={setAlertMessage} /> }/>
        <Route path='/expenses' element={<ExpenseView /> }/>
      </Routes>
    </div>
  );
}

export default App;