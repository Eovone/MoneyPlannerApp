import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomStyles/ButtonOverride.css';
import './CustomStyles/HeaderOverride.css';
import './CustomStyles/FormOverride.css';
import Home from './Views/Home';
import { Routes, Route } from 'react-router-dom';
import CreateUserForm from './Components/User/CreateUserForm';
import Header from './Components/Header';
import LoginUserForm from './Components/User/LoginUserForm';
import Alert from 'react-bootstrap/Alert';
import IncomeView from './Views/IncomeView';
import ExpenseView from './Views/ExpenseView';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from './Store/Store';
import { hideAlert } from './Store/actionCreators';
import { useEffect } from 'react';
import SummaryView from './Views/SummaryView';
import LoginView from './Views/LoginView';

function App() {
  const dispatch = useDispatch();
  const showAlert = useSelector((state: AppState) => state.alertInfo.showAlert);
  const alertSuccess = useSelector((state: AppState) => state.alertInfo.success);
  const alertMessage = useSelector((state: AppState) => state.alertInfo.message);

  useEffect(() => {    
    if (showAlert) {
      const timeout = setTimeout(() => {
        dispatch(hideAlert());
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [showAlert, dispatch]);

  return (
    <div>     
      <Header />

      {showAlert ? <Alert variant={ alertSuccess ? 'success' : 'danger' } 
                          onClose={() => dispatch(hideAlert())}                          
                          dismissible 
                          className='text-center'>
                   {alertMessage}
                   </Alert> : null }

      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/register' element={<CreateUserForm />} />
        <Route path='/' element={<LoginView />} />
        <Route path='/incomes' element={<IncomeView /> } />
        <Route path='/expenses' element={<ExpenseView /> } />
        <Route path='/summary' element={<SummaryView />} />
      </Routes>
    </div>
  );
}

export default App;