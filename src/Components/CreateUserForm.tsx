import { FC, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface CreateUserFormProps{
    onSubmit: (value: string) => void;
}

const CreateUserForm: FC<CreateUserFormProps> = (props) => {
  const [submittedUserName, setSubmittedUserName] = useState<string>("");

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(submittedUserName);    
  };

    return(
      <div className="container mt-3 border text-center bg-dark">
        <h2 className='mb-3 text-white'>Registrera Användare</h2>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="row justify-content-center">
            <Form.Control
              className='small-input'
              type='text'
              placeholder='Skriv in önskat Användarnamn'
              value={submittedUserName}
              onChange={(e) => setSubmittedUserName(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit' className='mt-3 mb-3'>
            Registrera
          </Button>
        </Form>
      </div>   
    )    
}
  
  export default CreateUserForm;