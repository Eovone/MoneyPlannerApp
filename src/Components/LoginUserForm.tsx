import { FC } from 'react';
import { Form, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from "react-router-dom";
import { FormProps } from '../Models/Interfaces/FormProps';
import { useFormik } from 'formik';
import { PostUserDto } from '../Models/Dto/PostUserDto';
import { postLoginUser } from '../Services/ApiService';

const LoginUserForm: FC<FormProps> = (props) => {
    const redirect = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async values => {
            let postLogin : PostUserDto = {
                username: values.username,
                password: values.password,
            }

            try {
                let response : boolean = await postLoginUser(postLogin);         
                if(response){
                    props.handleAlert(true);
                    props.setAlertMessage('Inloggning lyckades! Välkommen');                    
                    redirect('/Home');
                }
            } catch (error) {
                props.handleAlert(false);
                props.setAlertMessage('Inloggning misslyckades!');
            }
        },
    });

    return(
      <Container className='border border-4 border-dark mt-3 p-2'>
        <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className='align-items-center'>
                <Col>
                    <h1 className='text-light mb-5 text-center'>Logga in</h1>
                    <Form.Group className="mb-3">
                        <Form.Label className='text-light'>Användarnamn</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Användarnamn"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            isInvalid={formik.touched.username && !!formik.errors.username}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-1">
                        <Form.Label className='text-light'>Lösenord</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Lösenord"
                            name='password'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            isInvalid={formik.touched.password && !!formik.errors.password}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {formik.errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>                

                    <Button className='m-2' variant="light" type="submit">
                        Logga in
                    </Button>
                    
                </Col>                               
            </Row>
        </Form>

    </Container>   
    )    
}
  
  export default LoginUserForm;