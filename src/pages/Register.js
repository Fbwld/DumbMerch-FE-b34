import React, { useState} from 'react'
import logo from "../assets/img/logo.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form, Button,Alert, Container } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from '../context/userContext';

import {useMutation, useQuery } from 'react-query'

import { API } from '../config/api';


function PagesRegister(){
    let navigate = useNavigate();

    const title = 'Register';
    document.title = 'DumbMerch | ' + title;

    // const [state, dispatch] = useContext(UserContext);

    const [message, setMessage] = useState(null);

  // Create variabel for store data with useState here ...
    const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    });

    const { name, email, password } = form;

    const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    });
    };

    let { data: users } = useQuery('usersCache', async () => {
        const response = await API.get('/users');
        console.log(response)
        return response.data.data.user.data;
    });

    const handleSubmit = useMutation(async (e) => {
    try {
        e.preventDefault();

        const config = {
        headers: {
            'Content-type': 'application/json',
        },
        };

      // Data body
        const body = JSON.stringify(form);

      // Insert data user to database
        const response = await API.post('/register', body, config);
        navigate("/");

    } catch (error) {
        const alert = (
        <Alert variant="danger" className="py-1">
            Failed
        </Alert>
        );
        setMessage(alert);
        console.log(error);
    }
    });
    return(
        <>
        <Container>
            
            <div className="container-login">
                <div className="row">
                    <div className="" style={{display:"flex"}}>
                        <div className="logo" style={{
                            marginLeft:"139px"
                        }}>
                            <img src={logo} style={{
                                marginTop:"80px"
                            }}/>
                            <h1 className="text-PagesLogin">Easy, Fast and Reliable</h1>
                            <p className="paragraf-PagesLogin">Go shopping for merchandise, just go to dumb merch shopping. the biggest merchandise in <b>Indonesia</b></p>
                            <div className="btn-PagesLogin" style={{
                                marginTop:"60px"
                            }}>
                                <Link to="/" className='text-decoration-none'><button className="button-login-fl">Login</button></Link>
                                <Link to="/register" className='text-decoration-none'><button className="button-register-fl">Register</button></Link>
                            </div>
                        </div>
                        <div className="register">
                                <h3 className="login-name">Register</h3>
                                {message && message}
                            <form onSubmit={(e) => handleSubmit.mutate(e)}>
                                <Form.Group className="mb-3" controlId="formGroupName">
                                    <Form.Control 
                                    type="text" 
                                    placeholder="Name" 
                                    value={name} name="name" 
                                    onChange={handleChange} 
                                    style={{background:" rgba(210, 210, 210, 0.25)",color: "#ffffff"}} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Control 
                                    type="email" 
                                    placeholder="Email" 
                                    value={email} 
                                    name="email" 
                                    onChange={handleChange} 
                                    style={{background:" rgba(210, 210, 210, 0.25)",color: "#ffffff"}} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password} 
                                    name="password"  
                                    onChange={handleChange} 
                                    style={{background:" rgba(210, 210, 210, 0.25)",color: "#ffffff"}} />
                                </Form.Group>
                                <button className="btn-login" type="submit">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
        </>
    )
}
export default PagesRegister;