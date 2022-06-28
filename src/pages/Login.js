import { useContext,useState } from "react";
import logo from "../assets/img/logo.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form, Alert, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"
import { UserContext } from '../context/userContext';

import {useMutation} from 'react-query'

import { API } from '../config/api';

function PagesLogin(){
    let navigate = useNavigate();

    const title = 'Login';
    document.title = 'DumbMerch | ' + title;

    const [state, dispatch] = useContext(UserContext);
    

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
    email: '',
    password: '',
    });

    const { email, password } = form;

    const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    });
    };

    const handleSubmit = useMutation(async (e) => {
    try {
        e.preventDefault();

        // Configuration
        const config = {
        headers: {
            'Content-type': 'application/json',
        },
        };


        // Data body
        const body = JSON.stringify(form);

        // Insert data for login process
        const response = await API.post('/login', body, config);
        // Checking process
        console.log(response.data?.data?.data?.status === 'admin')
        console.log(response.data?.data?.user)
        localStorage.setItem("token", response.data?.data?.user?.token)
        if (response.data?.data?.user?.status === 'admin') {
            navigate('/complain-admin');
        } else {
            navigate('/complain');
        }
        if (response?.status === 200) {

        // Send data to useContext
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: response.data.data,
        });

        const alert = (
            <Alert variant="success" className="py-1">
            Login success
            </Alert>
        );
        setMessage(alert);
        }
    } catch (error) {
        const alert = (
        <Alert variant="danger" className="py-1">
            Login failed
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
                <div className="form-PagesLogin" style={{display:"flex"}}>
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
                            <Link to="/" className='text-decoration-none'><button className="button-login-fs">Login</button></Link>
                            <Link to="/register" className='text-decoration-none'><button className="button-register-fs">Register</button></Link>
                        </div>
                    </div>
                    <div className="login">
                        <form onSubmit={(e) => handleSubmit.mutate(e)}>
                            <h3 className="login-name">Login</h3>
                            {message && message}
                            <Form.Group className="mb-3 text-white"  controlId="formGroupEmail">
                                <Form.Control  
                                value={email}
                                name="email"
                                onChange={handleChange} 
                                type="email" 
                                placeholder="Email" 
                                style={{background:" rgba(210, 210, 210, 0.25)",color: "#ffffff"}} />
                            </Form.Group>
                            <Form.Group className="mb-3 text-white" controlId="formGroupPassword">
                                <Form.Control  
                                value={password} 
                                name="password" 
                                onChange={handleChange} 
                                type="password" 
                                placeholder="Password"  
                                style={{background:" rgba(210, 210, 210, 0.25)",color: "#ffffff"}} />
                            </Form.Group>
                            <button type="submit"className="btn-login">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Container>
    </>
)
}
export default PagesLogin;