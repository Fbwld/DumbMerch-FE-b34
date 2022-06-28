import React, { useState, useEffect,useContext} from 'react';
import { Container, Row, Col, Button,Navbar,Nav,Form} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import logo from "../assets/img/logo.png"
import CheckBox from '../components/form/CheckBox';
import {UserContext}  from '../context/userContext';
import { API } from '../config/api';
import { Link } from 'react-router-dom';

function PageEditProfile(){
        const title = "Profile";
        document.title = "DumbMerch | " + title;
    
        let navigate = useNavigate();
        const { id } = useParams();
    
        const [form, setForm] = useState({
            phone: '',
            gender: '',
            address: '',
        });

        const { phone,gender,address} = form
    
        let { refetch } = useQuery("profileCache", async () => {
        const response = await API.get("/profile/" + id);
        console.log(response.data.data)
        });
        console.log(form)
        const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        };
        
        const handleSubmit = useMutation(async (e) => {
        try {
            console.log(form)
            e.preventDefault();
     // Configuration
        const config = {
        body:JSON.stringify(form),
        method:"PATCH",
        headers:{
            Authorization:"Basic " + localStorage.token,
            'Content-type':'application/json'
        },
        };
        // const formData = new FormData();
        // formData.set('phone', form.phone);
        // formData.set('gender', form.gender);
        // formData.set('address', form.address);


        const response = await API.patch("/profile/" + id, config);
    
        navigate("/profile");
        } catch (error) {
            console.log(error);
        }
        });
    
    return(
        <>
        <div className="container-product">
            <Navbar collapseOnSelect expand="lg">
                <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <img src={logo}/>
                </Nav>
                <Nav className="nav">
                    <Link to="/complain-admin" className="text-decoration-none" style={{
                                height: "25px",
                                fontWeight: "900",
                                fontSize: "18px",
                                lineHeight: "25px",
                                color: "#FFFFFF",
                                marginRight:"23px"
                    }}>Complain</Link>
                    <Link to="/profile" className="text-decoration-none" style={{
                                height: "25px",
                                fontWeight: "900",
                                fontSize: "18px",
                                lineHeight: "25px",
                                color: "#F74D4D",
                                marginRight:"23px"
                    }}>Profile</Link>
                    <Link to="/" className="text-decoration-none" style={{
                                height: "25px",
                                fontWeight: "900",
                                fontSize: "18px",
                                lineHeight: "25px",
                                color: "#FFFFFF"
                    }}>Logout</Link>
                </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="py-5" style={{height:"88vh"}}>
            <Row>
            <Col xs="12">
                <div className="text-header-category mb-4 text-white">Edit Profile</div>
            </Col>
            <Col xs="12">
                <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="input-editC text-white" controlId="formGroupName">
                <Form.Control 
                type="text"  
                placeholder="Your Phone"
                name="phone"
                onChange={handleChange}
                value={form?.phone}
                style={{background:" rgba(210, 210, 210, 0.25)",color: "#ffffff"}} 
                />
                <Form.Control 
                type="text"  
                placeholder="Gender"
                name="gender"
                onChange={handleChange}
                value={form?.gender}
                style={{background:" rgba(210, 210, 210, 0.25)",marginTop:"20px",color: "#ffffff"}} 
                />
                <Form.Control 
                className="text-area-product" 
                as="textarea" 
                placeholder="Address"
                name="address"
                onChange={handleChange}
                value={form?.address}
                style={{background:" rgba(210, 210, 210, 0.25)",marginTop:"20px",color: "#ffffff"}} 
                />
                <div className="d-grid gap-2 mt-4">
                    <Button 
                    type="submit" 
                    variant="success" 
                    size="md" 
                    style={{background: "#56C05A",border:"none"}}>
                    Edit Profile
                    </Button>
                </div>
            </Form.Group>
                </form>
            </Col>
            </Row>
        </Container>
            
        </div>
        </>
    )
}
export default PageEditProfile;