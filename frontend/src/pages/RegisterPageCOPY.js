
// #region
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import '../App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import "./general.css"
// #regionend

const RegisterPageCOPY = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    Confirmpassword: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      //console.error(e);
    }
  };

  return (
    <main className="flex-row mb-4">
      <div className="col-12 col-lg-10">

        <div className="card-body">
          {data ? (
            <p>
              Success! You may now head{' '}
              <Link to="/home">back to the homepage.</Link>
            </p>
          ) : (
            <Container className='RegisterPage'>
              <Card style={{ width: '30rem', marginLeft:"20%" }}>
                <Card.Img variant="top" src="./images/register.jpg" />
                <Card.Body>
                  <Card.Title>Sign Up</Card.Title>
                  <Card.Text>
                    <Form onSubmit={handleFormSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicName" value={formState.name} onChange={handleChange}>
                        <Form.Label>Enter name</Form.Label>
                        <Form.Control type="name" placeholder="Enter name" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail" value={formState.email} onChange={handleChange}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword" value={formState.password} onChange={handleChange}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicConfirmPassword" value={formState.Confirmpassword} onChange={handleChange}>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" />
                      </Form.Group>

                      <Button variant="outline-primary" type="submit" style={{ cursor: 'pointer' }}>Submit</Button>
                    </Form>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card style={{ height: '70%', width:'70%' }}>
                <Card.Img variant="top" src="./images/DistributorRegister.jpg" />
                <Card.Body>
                  <Card.Title style={{ height: '70%', width:'80%' }}>Want a Distributor Business Account?</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Container>

          )}

          {error && (
            <div className="my-3 p-3 bg-danger text-white">
              {error.message}
            </div>
          )}
        </div>
      </div>

    </main>
  );
};

export default RegisterPageCOPY;
