import { FC, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface LoginUserFormProps{
    onSubmit: (value: string) => void;
}

const LoginUserForm: FC<LoginUserFormProps> = (props) => {
  const [userName, setUserName] = useState<string>("");

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(userName);
    // console.log('Username:', submittedUserName);
    // post user call
  };

    return(
      <div className="container mt-3 border text-center bg-dark">
        <h2 className='mb-3 text-white'>Logga in</h2>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="row justify-content-center">
            <Form.Control
              className='small-input'
              type='text'
              placeholder='Skriv in Användarnamn'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit' className='mt-3 mb-3'>
            Logga in
          </Button>
        </Form>
      </div>   
    )    
}
  
  export default LoginUserForm;